import os
import re
import csv
import textwrap
import asyncio

import aiohttp
import click
import html2text
from bs4 import BeautifulSoup
from dateutil.parser import parse


def strip_lang(text):
    m = re.search('<!--:en-->(.*?)<!--:-->', text, re.DOTALL)
    if m:
        return m.groups()[0]
    return text.replace('<!--:en-->', '')


def strip_square_brackets(text):
    return re.sub('\[/?(vc|mc|cap).*?\]', '', text)


def correct_md(text):
    # put all images on separate lines
    text = re.sub(' (!\[.*?\))', r'\n\n\1\n\n', text, 0, re.DOTALL)

    # remove bold from titles
    for _ in range(4):
        text = re.sub('^##(.*?)\*\*(.*?)', r'##\1\2', text, 0, re.MULTILINE)
    text = re.sub('^(#+) +', r'\1 ', text, 0, re.MULTILINE)
    text = re.sub('^(#{5,}) ', '', text, 0, re.MULTILINE)

    # text = re.sub('\*\* (.*?) \*\*', r'**\1**', text)

    # bold seems to mainly be headers
    text = re.sub('\*\* (.*?) \*\*', r'\n\n### \1\n\n', text)

    # remove excessive new lines
    text = re.sub('^ +', '', text, 0, re.MULTILINE)
    text = re.sub('\n{3,}', '\n\n', text)
    return text


def clean(text):
    text = strip_lang(text)
    html = strip_square_brackets(text)
    soup = BeautifulSoup(html, 'html.parser')
    html = soup.prettify()
    md = html2text.html2text(html)
    md = correct_md(md)
    return md.strip(' \n')

THIS_DIR = os.path.dirname(__file__)
POST_DIRECTORY = os.path.abspath(os.path.join(THIS_DIR, os.pardir, '_posts'))


@click.group()
def cli():
    pass


@cli.command()
def posts():
    files = os.listdir(POST_DIRECTORY)
    print('{} files in {}'.format(len(files), POST_DIRECTORY))

    template = """\
---
layout: post
title:  "{title}"
permalink: {name}
---
{content}
"""

    with open(os.path.join(THIS_DIR, 'posts.csv')) as csvfile:
        reader = csv.DictReader(csvfile)
        i = 0
        for i, row in enumerate(reader):
            date = parse(row['post_date'])
            name = row['post_name']
            title = clean(row['post_title'])
            title = title.split('\n', 1)[0]
            title = title.replace('  ', '|')
            title = title.split('|', 1)[0]
            post = template.format(
                content=clean(row['post_content']),
                title=title,
                name=name
            )
            file_name = '{}/{:%Y-%m-%d}-{}.md'.format(POST_DIRECTORY, date, name)
            with open(file_name, 'w') as f:
                f.write(post)

    print('generated {} posts'.format(i))


IMG_DIR = os.path.abspath(os.path.join(THIS_DIR, os.pardir, 'img', 'blogs'))


@cli.command()
def images():
    assert os.path.exists(IMG_DIR), '"{}" does not exist'.format(IMG_DIR)
    queue = asyncio.Queue()

    async def find_urls():
        urls = set()
        for file_name in os.listdir(POST_DIRECTORY):
            post_path = os.path.join(POST_DIRECTORY, file_name)
            with open(post_path) as post_file:
                text = post_file.read()
                for m in re.finditer(r'!\[.*?\]\((http://www\.tutorcruncher\.com.*?)\)', text, re.DOTALL):
                    url = m.groups()[0]
                    if url in urls:
                        continue
                    urls.add(url)
                    await queue.put((post_path, url))

    async def download_files():
        loop = asyncio.get_event_loop()
        client = aiohttp.ClientSession(loop=loop)
        while True:
            post_path, url = await queue.get()
            correct_url = url.replace('\n', '')
            file_name = os.path.basename(correct_url)
            if len(file_name) > 5:
                file_path = os.path.join(IMG_DIR, file_name)
                if not os.path.exists(file_path):
                    async with client.get(correct_url) as response:
                        if response.status != 200:
                            print('error downloading {}, response code: {}'.format(correct_url, response.status))
                        else:
                            with open(file_path, 'wb') as f:
                                f.write(await response.read())
                new_url = '/img/blogs/{}'.format(file_name)
                with open(post_path) as f:
                    text = f.read()
                print(file_path, new_url)
                new_text = text.replace(url, new_url)
                with open(post_path, 'w') as f:
                    f.write(new_text)
            queue.task_done()

    loop = asyncio.get_event_loop()
    loop.create_task(download_files())
    loop.create_task(find_urls())

    loop.run_until_complete(queue.join())


def get_next_by_name(soup, name, element='span'):
    spans = list(soup.find_all(element))
    for i, span in enumerate(spans):
        if span.string.lower() == name.lower():
            return spans[i + 1].string


def get_description(soup):
    def filter_description_span(s):
        return len(s.string) > 100 if s.string else False
    des_span = next(filter(filter_description_span, soup.find_all('span')), None)
    return '\n'.join(textwrap.wrap(des_span.string, 120)) if des_span else None

COMPANIES_DIR = os.path.abspath(os.path.join(THIS_DIR, os.pardir, 'companies'))


@cli.command()
def companies():
    template = """\
---
layout: company_profile
redirect_from: /tutor-agencies/{name}/
permalink: /companies/{name}/
title: "{title}"
founded: "{founded}"
telephone: "{telephone}"
email: "{email}"
website: "{website}"
address: "{address}"
map_address: "{map_address}"
description: "{title} TutorCruncher Company Profile"
categories: company
---
{content}
"""
    i = 0
    with open(os.path.join(THIS_DIR, 'companies.csv')) as csvfile:
        reader = csv.DictReader(csvfile)
        for i, row in enumerate(reader):
            title = clean(row['post_title'])
            print('{}: {}'.format(i, title))
            name = row['post_name']
            data = {
                'title': title,
                'name': name,
                'email': ''
            }
            text = row['post_content']
            m = re.search('\[vc_gmaps address="(.*?)"', text, re.DOTALL)
            address = m and m.groups()[0]
            text = strip_lang(text)
            html = strip_square_brackets(text)
            soup = BeautifulSoup(html, 'html.parser')
            for a in soup.find_all('a'):
                if a.get('href').startswith('mailto'):
                    data['email'] = a.string
                    break
            data.update(
                founded=get_next_by_name(soup, 'date of foundation') or '',
                telephone=get_next_by_name(soup, 'telephone') or '',
                website=get_next_by_name(soup, 'web-site') or '',
                address=address or '',
                map_address='{}, United Kingdom'.format(address) if address else '',
                content=get_description(soup) or '',
            )
            text = template.format(**data)
            file_name = '{}/{}.md'.format(COMPANIES_DIR, name)
            with open(file_name, 'w') as f:
                f.write(text)
    print('generated {} company profiles'.format(i))


if __name__ == '__main__':
    cli()

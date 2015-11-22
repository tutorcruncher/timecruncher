import os
import csv
import re
import html2text
from bs4 import BeautifulSoup
from dateutil.parser import parse


def strip_lang(text):
    m = re.search('<!--:en-->(.*?)<!--:-->', text)
    if m:
        return m.groups()[0]
    return text.replace('<!--:en-->', '')


def strip_square_brackets(text):
    return re.sub('\[/?(vc|mc).*?\]', '', text)


def correct_md(text):
    # put all images on seperate lines
    text = re.sub(' (!\[.*?\)) ', r'\n\n\1\n\n', text, 0, re.DOTALL)

    # remove bold from titles
    for _ in range(4):
        text = re.sub('^##(.*?)\*\*(.*?)', r'##\1\2', text, 0, re.MULTILINE)
    text = re.sub('^(#+) +', r'\1 ', text, 0, re.MULTILINE)
    text = re.sub('^(#{5,}) ', '', text, 0, re.MULTILINE)

    # text = re.sub('\*\* (.*?) \*\*', r'**\1**', text)

    # bold seems to mainly be headers
    text = re.sub('\*\* (.*?) \*\*', r'\n\n### \1\n\n', text)
    return text


def clean(text):
    html = strip_square_brackets(text)
    soup = BeautifulSoup(html, 'html.parser')
    html = soup.prettify()
    md = html2text.html2text(html)
    md = correct_md(md)
    return md.strip(' \n')

THIS_DIR = os.path.dirname(__file__)
DIRECTORY = os.path.abspath(os.path.join(THIS_DIR, os.pardir, '_posts'))
files = os.listdir(DIRECTORY)
print('{} files in {}'.format(len(files), DIRECTORY))

template = """\
---
layout: post
title:  "{title}"
permalink: {name}
---
{content}
"""

with open('posts.csv') as csvfile:
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
        file_name = '{}/{:%Y-%m-%d}-{}.md'.format(DIRECTORY, date, name)
        with open(file_name, 'w') as f:
            f.write(post)

print('generated {} posts'.format(i))

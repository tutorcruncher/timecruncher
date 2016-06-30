#!/usr/bin/python
"""
Script to generate the change log, as well as using regex to change it into a yaml file.
Uses the git remote origin

sudo gem install github_changelog_generator
"""
import os
import sys
import re


def create_yaml():
    with open('./_data/generated_change_log.yml', 'r') as f:
        old_data = f.read()
    block_regex = '(?s)##.*?\n\n'

    releases = re.findall(block_regex, old_data)
    fix_title_regex = '##.*?\[(.*?)\].*'
    fix_body_regex = ' \[\\\\.*'

    new_data = []
    print 'Formatting for YAML'
    for release in releases:
        release = re.sub(fix_title_regex, r'\1\n', release)
        release = re.sub(fix_body_regex, '', release)
        release = re.sub('(v\d\d.*\n)', r'-\n  title: \1  notes:', release)
        release = re.sub('\n\- ', '\n    - ', release)
        new_data.append(release)

    data = ''.join(new_data)

    data = re.sub("([,'\"!?])", "", data)
    data = re.sub('\\\_', '_', data)
    data = re.sub('\ntc1-mig.*\n', '\n', data)

    print 'Rough translation'
    data = re.sub('service recipient|sr|recipient', 'Student', data, flags=re.I)
    data = re.sub('service', 'Job', data, flags=re.I)
    data = re.sub('contractor', 'Tutor', data, flags=re.I)
    data = re.sub('appointment|appt|apt', 'Lesson', data, flags=re.I)
    data = re.sub('&', '&nbsp;', data)

    with open('./_data/generated_change_log.yml', 'w') as f:
        f.write(data)


def download_data():
    command = 'github_changelog_generator tutorcruncher/TimeCruncher2'
    os.system(command)


if __name__ == '__main__':
    command = sys.argv[-1].lower()
    assert command in {'download', 'create', 'all'}, '%s not a valid command: download, create all' % command
    if command in {'download', 'all'}:
        print 'Downloading the change log'
        download_data()
    if command in {'create', 'all'}:
        print 'Creating YAML file'
        create_yaml()

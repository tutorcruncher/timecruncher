#!/usr/bin/python
"""
Script to generate the change log, as well as using regex to change it into a yaml file.
Uses the git remote origin

sudo gem install github_changelog_generator
"""
import os
import sys
import re

change_log_dir = './site/_data/change_log.yml'


def create_yaml():
    with open(change_log_dir, 'r') as f:
        old_data = f.read()

    block_regex = '(?s)##.*?\n\n'
    releases = re.findall(block_regex, old_data)

    release_regexes = [
        ('##.*?\[(.*?)\].*', r'\1\n'),
        (' \[\\\\.*', ''),
        ('(v\d\d.*\n)', r'-\n  title: \1  notes:'),
        ('\n\- ', '\n    - ')
    ]

    data_regexes = [
        ("([,'\"!?])", ""),
        ('\\\_', '_'),
        ('\ntc1-mig.*\n', '\n'),
    ]

    translations = [
        ('service recipient|sr|recipient', 'Student'),
        ('service', 'Job'),
        ('contractor', 'Tutor'),
        ('appointment|appt|apt', 'Lesson'),
        ('&', '&nbsp;')
    ]

    print 'Formatting for YAML'
    new_data = []
    for release in releases:
        for p, r in release_regexes:
            release = re.sub(p, r, release)
        release = release.capitalize()
        new_data.append(release)

    data = ''.join(new_data)
    for p, r in data_regexes:
        data = re.sub(p, r, data)

    print 'Creating rough translation'
    for p, r in translations:
        data = re.sub(p, r, data, flags=re.I)

    with open(change_log_dir, 'w') as f:
        f.write(data)


def download_data():
    command = 'github_changelog_generator tutorcruncher/TutorCruncher2'
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

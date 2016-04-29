import re

with open('../_data/generated_change_log.yml','r') as f:
    old_data = f.read()

block_regex = '(?s)##.*?\n\n'

releases = re.findall(block_regex, old_data)

fix_title_regex = '##.*?\[(.*?)\].*'
fix_body_regex = ' \[\\\\.*'

new_data = []

for release in releases:
    release = re.sub(fix_title_regex, r'\1\n', release)
    release = re.sub(fix_body_regex, '', release)
    release = re.sub('(v\d\d.*\n)', r'-\n  title: \1  notes:', release)
    release = re.sub('\n\- ', '\n    - ', release)
    new_data.append(release)

data = ''.join(new_data)

data = re.sub("([,'\"!?])", "", data)
data = re.sub('\ntc1-mig.*\n', '\n', data)

with open('../_data/generated_change_log.yml', 'w') as f:
    f.write(data)

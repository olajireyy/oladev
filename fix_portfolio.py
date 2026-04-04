import os

if not os.path.exists('css'):
    os.makedirs('css')
if not os.path.exists('js'):
    os.makedirs('js')

file_path = 'index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# find <style> and </style>
style_start = -1
style_end = -1
for i, line in enumerate(lines):
    if '<style>' in line and style_start == -1:
        style_start = i
    if '</style>' in line and style_start != -1 and style_end == -1:
        style_end = i
        break

# find <script> and </script> ending block (ignoring other small scripts if any)
script_start = -1
script_end = -1
for i in range(len(lines)-1, -1, -1):
    if '</script>' in lines[i] and script_end == -1:
        script_end = i
    if '<script>' in lines[i] and script_end != -1 and script_start == -1:
        script_start = i
        break

style_lines = lines[style_start+1:style_end]
script_lines = lines[script_start+1:script_end]

# Modify style_lines: add mobile skill deck logic
style_lines.append('\n/* Mobile skill deck 3 on a row */\n')
style_lines.append('@media (max-width: 600px) {\n')
style_lines.append('  .skill-icons-grid { grid-template-columns: repeat(3, 1fr) !important; }\n')
style_lines.append('}\n')

with open('css/style.css', 'w', encoding='utf-8') as f:
    f.writelines(style_lines)

with open('js/script.js', 'w', encoding='utf-8') as f:
    f.writelines(script_lines)

# Reconstruct index.html
new_lines = []
for i, line in enumerate(lines[:style_start]):
    new_lines.append(line)

new_lines.append('  <link rel="stylesheet" href="css/style.css">\n')

for i, line in enumerate(lines[style_end+1:script_start]):
    if '<nav class="sb-socials">' in line:
        new_lines.append(line)
        new_lines.append('        <a href="https://github.com/olajireyy" class="sb-social-btn"><i class="bx bxl-github"></i></a>\n')
    else:
        new_lines.append(line)

new_lines.append('<script src="js/script.js"></script>\n')

for i, line in enumerate(lines[script_end+1:]):
    new_lines.append(line)

with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('Done.')

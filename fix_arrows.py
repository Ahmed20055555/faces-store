import re
files=['src/app/page.tsx', 'src/components/ProductSection.tsx']
for f in files:
  with open(f, 'r', encoding='utf-8') as file:
    content = file.read()
  new_content = re.sub(r'(shadow-\[0_2px_8px_rgba\(0,0,0,0\.15\)\])("|\s)', r'\1 disabled:hidden\2', content)
  with open(f, 'w', encoding='utf-8') as file:
    file.write(new_content)
print('Done')

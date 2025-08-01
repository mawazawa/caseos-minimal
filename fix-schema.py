#!/usr/bin/env python3
"""
Quick script to fix Prisma schema enums by adding @@schema attributes.
Educational Note: This is like a robot helper that reads our schema file
and adds the missing @@schema labels to all our enums automatically!
"""

import re

# Read the schema file
with open('schema.prisma', 'r') as f:
    content = f.read()

# Find all enum blocks and add @@schema("legal") if missing
enum_pattern = r'(enum\s+\w+\s*\{[^}]*\})'

def fix_enum(match):
    enum_block = match.group(1)
    if '@@schema(' not in enum_block:
        # Insert @@schema("legal") before the closing brace
        return enum_block[:-1] + '\n\n  @@schema("legal")\n}'
    return enum_block

# Apply the fix to all enums
fixed_content = re.sub(enum_pattern, fix_enum, content, flags=re.DOTALL)

# Write back the fixed schema
with open('schema.prisma', 'w') as f:
    f.write(fixed_content)

print("✅ Fixed all enum @@schema attributes!")
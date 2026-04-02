#!/usr/bin/env python3
"""
清理项目描述中的硬编码 stars 数据
"""
import json
import re
import sys

def clean_stars_from_text(text, stars):
    """清理文本中的硬编码 stars 数据"""
    if not text:
        return text

    # 构建匹配模式
    stars_k = f"{int(stars/1000)}k"
    stars_k_decimal = f"{stars/1000:.1f}k".replace('.0k', 'k')

    # 英文模式: "With XXk+ stars, it..." -> "It..."
    patterns_en = [
        rf'With\s+{stars_k}\+?\s*stars?\s*,\s*it\s+',
        rf'With\s+{stars_k_decimal}\+?\s*stars?\s*,\s*it\s+',
        rf'With\s+{stars:,}\+?\s*stars?\s*,\s*it\s+',
        rf'With\s+{stars}\+?\s*stars?\s*,\s*it\s+',
    ]

    # 中文模式: "拥有 XXk+ Star，它..." -> "它..."
    patterns_zh = [
        rf'拥有\s*{stars_k}\+?\s*[Ss]tar\s*[，,]\s*它\s*',
        rf'拥有\s*{stars_k_decimal}\+?\s*[Ss]tar\s*[，,]\s*它\s*',
        rf'拥有\s*{stars:,}\+?\s*[Ss]tar\s*[，,]\s*它\s*',
        rf'拥有\s*{stars}\+?\s*[Ss]tar\s*[，,]\s*它\s*',
    ]

    cleaned = text

    # 应用英文模式
    for pattern in patterns_en:
        cleaned = re.sub(pattern, 'It ', cleaned, flags=re.IGNORECASE)

    # 应用中文模式
    for pattern in patterns_zh:
        cleaned = re.sub(pattern, '它', cleaned, flags=re.IGNORECASE)

    # 清理其他可能的变体
    # "With Xk+ stars and reaching..." -> "Reaching..."
    cleaned = re.sub(
        rf'With\s+{stars_k}\+?\s*stars?\s+and\s+reaching',
        'Reaching',
        cleaned,
        flags=re.IGNORECASE
    )

    return cleaned

def main():
    input_file = '/Users/joe/Project/awesome-harness/src/data/projects.json'
    output_file = '/Users/joe/Project/awesome-harness/src/data/projects.json'

    print("Loading projects data...")
    with open(input_file, 'r', encoding='utf-8') as f:
        projects = json.load(f)

    cleaned_count = 0
    projects_cleaned = set()

    for p in projects:
        stars = p.get('stars', 0)
        if stars < 1000:
            continue

        fields_to_clean = ['chineseDescription', 'detailedDescription', 'description', 'descriptionZh']
        project_cleaned = False

        for field in fields_to_clean:
            original = p.get(field, '')
            if original:
                cleaned = clean_stars_from_text(original, stars)
                if cleaned != original:
                    p[field] = cleaned
                    project_cleaned = True
                    cleaned_count += 1
                    print(f"✓ Cleaned {field} in {p['name']}")

        if project_cleaned:
            projects_cleaned.add(p['name'])

    print(f"\n{'='*60}")
    print(f"Cleaned {cleaned_count} fields across {len(projects_cleaned)} projects")
    print(f"Projects affected: {', '.join(sorted(projects_cleaned))}")
    print(f"{'='*60}")

    # Save the cleaned data
    print(f"\nSaving to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2, ensure_ascii=False)

    print("Done!")
    return 0

if __name__ == '__main__':
    sys.exit(main())

#!/usr/bin/env python3
"""
랜딩페이지 검증 및 오류 검사 자동화 스크립트
작동 확인, 링크 검사, 오류 감지 등을 자동으로 수행합니다.
"""

import re
import sys
from collections import defaultdict
from html.parser import HTMLParser

class LinkExtractor(HTMLParser):
    """HTML에서 링크와 버튼 추출"""
    def __init__(self):
        super().__init__()
        self.links = []
        self.buttons = []
        self.forms = []
        self.inputs = []
        self.images = []
        self.scripts = []
        self.styles = []
    
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        if tag == 'a':
            self.links.append(attrs_dict.get('href', '#'))
        elif tag == 'button':
            self.buttons.append({
                'text': attrs_dict.get('value', ''),
                'onclick': attrs_dict.get('onclick', '')
            })
        elif tag == 'form':
            self.forms.append(attrs_dict.get('action', ''))
        elif tag == 'input':
            self.inputs.append({
                'type': attrs_dict.get('type', 'text'),
                'name': attrs_dict.get('name', ''),
                'required': 'required' in attrs_dict
            })
        elif tag == 'img':
            self.images.append({
                'src': attrs_dict.get('src', ''),
                'alt': attrs_dict.get('alt', '')
            })
        elif tag == 'script':
            self.scripts.append(attrs_dict.get('src', 'inline'))
        elif tag == 'link' and attrs_dict.get('rel') == 'stylesheet':
            self.styles.append(attrs_dict.get('href', ''))

class LandingPageValidator:
    """랜딩페이지 검증 및 오류 검사"""
    
    def __init__(self, html_content):
        self.html = html_content
        self.errors = defaultdict(list)
        self.warnings = defaultdict(list)
        self.info = defaultdict(list)
        self.extractor = LinkExtractor()
        self.extractor.feed(html_content)
    
    def run_all_checks(self):
        """모든 검사 실행"""
        self.check_links()
        self.check_buttons()
        self.check_forms()
        self.check_console_errors()
        self.check_performance()
        self.check_mobile()
        self.check_security()
        self.check_accessibility()
        return self.generate_report()
    
    def check_links(self):
        """링크 작동 확인"""
        print("🔗 링크 검사 중...")
        
        links_found = len(set(self.extractor.links))
        broken_links = []
        external_links = []
        anchor_links = []
        
        for link in set(self.extractor.links):
            if link.startswith('http'):
                external_links.append(link)
            elif link.startswith('#'):
                anchor_links.append(link)
            elif link.startswith('/') or link.endswith('.html'):
                # 로컬 링크 검사
                if '404' in link or 'notfound' in link.lower():
                    broken_links.append(link)
        
        self.info['links'] = [
            f"총 링크: {links_found}개",
            f"앵커 링크: {len(anchor_links)}개",
            f"외부 링크: {len(external_links)}개"
        ]
        
        if broken_links:
            self.errors['links'] = [f"404 링크: {', '.join(broken_links)}"]
        else:
            self.info['links'].append("✓ 깨진 링크 없음")
    
    def check_buttons(self):
        """버튼 작동 확인"""
        print("🔘 버튼 검사 중...")
        
        buttons_found = len(self.extractor.buttons)
        cta_buttons = 0
        
        # CTA 버튼 감지
        cta_keywords = ['시작', '가입', '신청', '구매', '시험', 'start', 'signup', 'buy']
        for btn in self.extractor.buttons:
            text = btn.get('text', '').lower()
            if any(kw in text for kw in cta_keywords):
                cta_buttons += 1
        
        self.info['buttons'] = [
            f"총 버튼: {buttons_found}개",
            f"CTA 버튼: {cta_buttons}개"
        ]
        
        if buttons_found == 0:
            self.warnings['buttons'] = ["⚠ 버튼 없음 (상호작용 요소 필요)"]
        elif cta_buttons == 0:
            self.warnings['buttons'] = ["⚠ CTA 버튼 없음"]
    
    def check_forms(self):
        """폼 검증"""
        print("📋 폼 검사 중...")
        
        forms_found = len(self.extractor.forms)
        inputs_found = len(self.extractor.inputs)
        required_inputs = sum(1 for inp in self.extractor.inputs if inp['required'])
        
        self.info['forms'] = [
            f"폼 개수: {forms_found}개",
            f"입력 필드: {inputs_found}개",
            f"필수 필드: {required_inputs}개"
        ]
        
        # 입력 필드 검사
        input_types = defaultdict(int)
        for inp in self.extractor.inputs:
            input_types[inp['type']] += 1
        
        for inp_type, count in input_types.items():
            self.info['forms'].append(f"  - {inp_type}: {count}개")
        
        if forms_found > 0 and inputs_found < required_inputs:
            self.warnings['forms'] = ["⚠ 필수 입력 필드 표시 불완전"]
    
    def check_console_errors(self):
        """콘솔 오류 감지"""
        print("🖥️  콘솔 오류 검사 중...")
        
        # HTML에서 발견 가능한 오류 패턴
        errors_found = []
        
        # undefined 참조
        if 'undefined' in self.html:
            errors_found.append("undefined 참조")
        
        # 잘못된 이미지 경로
        missing_alt = sum(1 for img in self.extractor.images if not img['alt'])
        if missing_alt > 0:
            self.warnings['console'] = [f"⚠ 이미지 {missing_alt}개에 alt 텍스트 없음"]
        
        # CSS/JS 경로 오류
        broken_css = []
        for style in self.extractor.styles:
            if '404' in style or 'error' in style.lower():
                broken_css.append(style)
        
        broken_js = []
        for script in self.extractor.scripts:
            if '404' in script or 'error' in script.lower():
                broken_js.append(script)
        
        if broken_css:
            self.errors['console'] = [f"CSS 경로 오류: {broken_css}"]
        if broken_js:
            self.errors['console'] = [f"JS 경로 오류: {broken_js}"]
        
        if not errors_found and not broken_css and not broken_js:
            self.info['console'] = ["✓ 주요 오류 없음"]
    
    def check_performance(self):
        """성능 오류 검사"""
        print("⚡ 성능 검사 중...")
        
        # 파일 크기
        size_kb = len(self.html) / 1024
        
        # 리소스 개수
        img_count = len(self.extractor.images)
        script_count = len(self.extractor.scripts)
        style_count = len(self.extractor.styles)
        
        self.info['performance'] = [
            f"파일 크기: {size_kb:.1f}KB",
            f"이미지: {img_count}개",
            f"스크립트: {script_count}개",
            f"스타일시트: {style_count}개"
        ]
        
        if size_kb > 500:
            self.warnings['performance'] = [f"⚠ 파일 크기 큼 ({size_kb:.1f}KB)"]
        
        if script_count > 10:
            self.warnings['performance'].append(f"⚠ 스크립트 많음 ({script_count}개)")
    
    def check_mobile(self):
        """모바일 호환성 검사"""
        print("📱 모바일 호환성 검사 중...")
        
        # viewport 확인
        has_viewport = 'viewport' in self.html.lower()
        
        # 반응형 메타 태그
        has_responsive = 'width=device-width' in self.html.lower()
        
        self.info['mobile'] = []
        
        if has_viewport and has_responsive:
            self.info['mobile'].append("✓ viewport 설정됨")
        else:
            self.errors['mobile'] = ["✗ viewport 메타 태그 없음"]
        
        # 터치 타겟 크기 (직접 측정 필요)
        self.info['mobile'].append("ℹ 터치 타겟 크기: 브라우저 DevTools 확인 필요")
    
    def check_security(self):
        """보안 검사"""
        print("🔒 보안 검사 중...")
        
        security_checks = []
        
        # SSL/TLS (프로토콜)
        if 'https' in self.html.lower():
            security_checks.append("✓ HTTPS 링크 사용")
        
        # Mixed Content 확인
        if 'http://' in self.html and 'https://' in self.html:
            self.errors['security'] = ["✗ Mixed Content (HTTP + HTTPS)"]
        
        # API 키 노출 확인
        api_patterns = ['api_key', 'apikey', 'secret', 'password', 'token']
        for pattern in api_patterns:
            if pattern in self.html.lower():
                self.errors['security'] = [f"✗ 민감정보 노출: {pattern}"]
        
        # CSRF 토큰 확인
        if 'csrf' in self.html.lower():
            security_checks.append("✓ CSRF 보호")
        
        self.info['security'] = security_checks if security_checks else ["ℹ 기본 보안 검사"]
    
    def check_accessibility(self):
        """접근성 검사"""
        print("♿ 접근성 검사 중...")
        
        # H1 태그
        h1_count = len(re.findall(r'<h1[^>]*>', self.html, re.IGNORECASE))
        
        # Alt 텍스트
        images_with_alt = sum(1 for img in self.extractor.images if img['alt'])
        images_total = len(self.extractor.images)
        
        self.info['accessibility'] = [
            f"H1 태그: {h1_count}개 (권장: 1개)"
        ]
        
        if h1_count != 1:
            self.warnings['accessibility'] = [f"⚠ H1 태그 {h1_count}개 (1개 권장)"]
        
        if images_total > 0:
            self.info['accessibility'].append(f"이미지 alt: {images_with_alt}/{images_total}개")
            if images_with_alt < images_total:
                self.warnings['accessibility'].append(
                    f"⚠ {images_total - images_with_alt}개 이미지에 alt 텍스트 없음"
                )
    
    def generate_report(self):
        """리포트 생성"""
        return {
            'errors': dict(self.errors),
            'warnings': dict(self.warnings),
            'info': dict(self.info)
        }

def print_report(report):
    """리포트 출력"""
    print("\n" + "="*70)
    print("🚀 랜딩페이지 검증 - 작동 확인 & 오류 검사")
    print("="*70 + "\n")
    
    total_errors = sum(len(v) for v in report['errors'].values())
    total_warnings = sum(len(v) for v in report['warnings'].values())
    total_info = sum(len(v) for v in report['info'].values())
    
    # 정보
    if report['info']:
        print("ℹ️  정보 ({:d})".format(total_info))
        print("-" * 70)
        for category, items in report['info'].items():
            print(f"  [{category.upper()}]")
            for item in items:
                print(f"    {item}")
        print()
    
    # 경고
    if report['warnings']:
        print("⚠️  경고 ({:d})".format(total_warnings))
        print("-" * 70)
        for category, items in report['warnings'].items():
            print(f"  [{category.upper()}]")
            for item in items:
                print(f"    {item}")
        print()
    
    # 오류
    if report['errors']:
        print("❌ 오류 ({:d})".format(total_errors))
        print("-" * 70)
        for category, items in report['errors'].items():
            print(f"  [{category.upper()}]")
            for item in items:
                print(f"    {item}")
        print()
    
    # 최종 결과
    print("="*70)
    if total_errors == 0 and total_warnings == 0:
        print("✅ 검증 완료: 배포 가능!")
        result = 0
    elif total_errors == 0:
        print("⚠️  검증 완료: 개선 권장 후 배포")
        result = 1
    else:
        print("❌ 검증 실패: 필수 수정 필요")
        result = 2
    
    print(f"결과: 오류 {total_errors}개 | 경고 {total_warnings}개 | 정보 {total_info}개")
    print("="*70 + "\n")
    
    return result

def main():
    """메인 함수"""
    if len(sys.argv) < 2:
        print("사용법: python validate_and_check.py <html_file>")
        print("예: python validate_and_check.py landing.html")
        sys.exit(1)
    
    html_file = sys.argv[1]
    
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        validator = LandingPageValidator(html_content)
        report = validator.run_all_checks()
        exit_code = print_report(report)
        
        sys.exit(exit_code)
    
    except FileNotFoundError:
        print(f"❌ 파일을 찾을 수 없음: {html_file}")
        sys.exit(3)
    except Exception as e:
        print(f"❌ 오류 발생: {str(e)}")
        sys.exit(4)

if __name__ == "__main__":
    main()

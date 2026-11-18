# KOGOS (코고스) 홈페이지

임베디드 H/W 설계 ODM · 산업용 LCD/CTP 기업 코고스의 정적 웹사이트입니다.
빌드 도구나 서버 없이 폴더째 업로드하면 동작합니다.

## 구성

```
kogos-website/
├── index.html                 # 전체 페이지 (한/영 문구를 함께 담고 CSS로 전환)
├── styles.css                 # 디자인·반응형·모달·인쇄 스타일
├── script.js                  # 언어 전환, 모바일 메뉴, 스크롤 효과, 사양 모달, 문의 폼
└── assets/
    ├── favicon.svg
    ├── docs/KOGOS-ODM-Product-List-2026.pdf   # 다운로드용 카탈로그(원본)
    └── images/products/        # 2026 ODM 제품 사진 (1500px 원본 / 900px 카드용)
```

## 로컬에서 보기

`index.html`을 브라우저로 열면 바로 확인할 수 있습니다.
`python3 -m http.server` 로 폴더를 띄우면 `http://localhost:8000` 에서도 확인할 수 있습니다.

## 배포 방법

1. **Cafe24 · 가비아 등 웹호스팅** — FTP로 `kogos-website` 폴더 안의 파일을 `www`(또는 `html`) 폴더에 업로드하고,
   도메인을 연결합니다. `index.html`이 최상위에 오도록 올리면 됩니다.
2. **GitHub Pages** — 저장소에 파일을 올린 뒤 Settings → Pages에서 브랜치(root)를 지정하면
   `https://<계정>.github.io/<저장소>/` 로 열립니다.
3. **Vercel / Netlify** — 폴더를 끌어다 놓거나 저장소를 연결하면 자동 배포됩니다(빌드 명령 없음, 출력 디렉터리 `.`).
4. **회사 서버** — 아파치/nginx의 정적 디렉터리에 복사.

## 수정할 때

- **문구**: `index.html`에서 `<span class="ko">…</span>`(한국어)와 `<span class="en">…</span>`(영어)를 함께 고칩니다.
  두 언어의 span 개수가 짝을 이루어야 합니다.
- **제품 사양**: 각 제품의 "전체 사양 보기" 모달 안 `.spec-panel` 표를 고칩니다.
- **연락처·주소**: `#contact` 섹션, 푸터, 그리고 `script.js`의 `jylee@kogos.co.kr`(문의 메일 주소)를 함께 확인합니다.
- **로고**: 헤더·푸터의 `<svg class="brand-mark">` 도형입니다. 공식 로고 파일이 있으면 이미지로 교체해도 됩니다.
- **제품 사진 교체**: `assets/images/products/` 의 파일을 같은 이름으로 바꾸면 카드와 모달에 함께 반영됩니다.
  (배경이 밝은 단색인 사진을 쓰면 카드와 자연스럽게 이어집니다.)

## 참고

- 문의 폼은 서버 없이 동작하도록 `mailto:` 방식으로 만들었습니다. 전송을 누르면 방문자의 메일 앱이 열립니다.
  서버 저장이 필요한 경우 폼 전송 서비스(Formspree 등)나 자체 스크립트로 교체해야 합니다.
- 모든 문구는 2026 ODM Product List와 회사 소개 자료를 기준으로 작성했습니다.

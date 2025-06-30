# HOUME

![HOUME Logo](https://img.shields.io/badge/HOUME-나다운%20집을%20만들어주는%20여정-FF6B6B?style=for-the-badge)

<br/> <strong>"나다운 집을 만들어주는 여정, 하우미"</strong>

나만의 개성과 취향이 담긴 공간을 만들어가는 특별한 경험을 제공하는 서비스입니다.

---

## 📌 서비스 소개

HOUME는 사용자가 자신만의 개성 있는 공간을 디자인하고 꾸밀 수 있도록 도와주는 AI 인테리어 플랫폼입니다.

---

## 🏡 HOUME FE Developers

<div align="center">
  <table>
    <thead>
      <tr>
        <th>엄경호</th>
        <th>박소이</th>
        <th>임지성</th>
        <th>조성하</th>
        <th>문혜성</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <img 
            src="https://github.com/maehwasoo.png" 
            alt="엄경호" 
            style="width: 140px; height: 140px; border-radius: 50%;"
          />
        </td>
        <td>
          <img 
            src="https://github.com/soyyyyy.png" 
            alt="박소이" 
            style="width: 140px; height: 140px; border-radius: 50%;"
          />
        </td>
        <td>
          <img 
            src="https://github.com/jstar000.png" 
            alt="임지성" 
            style="width: 140px; height: 140px; border-radius: 50%;"
          />
        </td>
        <td>
          <img 
            src="https://github.com/earl9rey.png" 
            alt="조성하" 
            style="width: 140px; height: 140px; border-radius: 50%;"
          />
        </td>
        <td>
          <img 
            src="https://github.com/sndks.png" 
            alt="문혜성" 
            style="width: 140px; height: 140px; border-radius: 50%;"
          />
        </td>
      </tr>
      <tr align="center">
        <td>
          <a href="https://github.com/maehwasoo" target="_blank">@maehwasoo</a>
        </td>
        <td>
          <a href="https://github.com/soyyyyy" target="_blank">@soyyyyy</a>
        </td>
        <td>
          <a href="https://github.com/jstar000" target="_blank">@jstar000</a>
        </td>
        <td>
          <a href="https://github.com/earl9rey" target="_blank">@earl9rey</a>
        </td>
        <td>
          <a href="https://github.com/sndks" target="_blank">@sndks</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<br />

## 🛠️ Tech Stack

| 역할                       | 종류                                                                                                                                                                                                              |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Library`**              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white) ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white)                |
| **`Programming Language`** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                             |
| **`Styling`**              | ![Vanilla Extract](https://img.shields.io/badge/Vanilla%20Extract-%23F786AD?style=for-the-badge&logo=vanillaextract&logoColor=white)                                                                              |
| **`Data Fetching`**        | ![TanstackQuery](https://img.shields.io/badge/TanstackQuery-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)                                                                                           |
| **`UI Documentation`**     | ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)                                                                                                    |
| **`Formatting`**           | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) |
| **`Package Manager`**      | ![PNPM](https://img.shields.io/badge/pnpm-%23F29F05?style=for-the-badge&logo=pnpm&logoColor=white)                                                                                                                |
| **`Version Control`**      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)  |

<br />

## 📭 Git Convention

### Git Flow

**메인 브랜치**

- **`main`** - 배포 가능한 상태만을 관리합니다
- **`develop`** - 통합 브랜치 역할을 하며, 평소에는 해당 브랜치를 기반으로 개발을 진행합니다. 모든 기능이 정상적으로 동작할 수 있는 안정적인 상태를 유지하고, 배포가 가능한 상태라면 `main` 브랜치에 `merge` 합니다

**피쳐 브랜치**

- `develop` 브랜치에서 분기하여 `develop` 브랜치로 `merge`

### Branch Convention

모든 기능은 구현 이전 이슈를 생성하여 관리합니다.

**브랜치 네이밍**: `type/설명/#이슈번호`

```
feat/login-page/#12
fix/button-style/#25
```

### Issue Convention

**형식**: `[type] 제목`

```
예시: [feat] 로그인 페이지 구현
```

### Pull Request Convention

**형식**: `[type] 제목`

```
예시: [feat] 로그인 페이지 구현
```

### Commit Convention

**형식**: `type: 제목`

```
예시: "feat: 로그인 기능 구현"
```

| 커밋유형   | 의미                                                                          |
| ---------- | ----------------------------------------------------------------------------- |
| `feat`     | 새로운 기능 추가                                                              |
| `fix`      | 버그 수정                                                                     |
| `docs`     | 문서 수정                                                                     |
| `style`    | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우, 비즈니스 로직 변경 X       |
| `refactor` | 코드 리팩토링                                                                 |
| `test`     | 테스트 코드, 리팩토링 테스트 코드 추가, 비즈니스 로직 변경 X                  |
| `chore`    | 설정 변경사항 (빌드 스크립트, assets, 패키지 매니저 등), 프로덕션 코드 변경 X |
| `design`   | CSS 등 사용자 UI 디자인 추가/수정                                             |
| `comment`  | 주석 추가/수정                                                                |
| `rename`   | 파일 및 폴더명 수정                                                           |
| `remove`   | 파일 삭제                                                                     |

<br />

---

<div align="center">
  <strong>🏠 나다운 집을 만들어가는 여정, HOUME과 함께하세요! 🏠</strong>
</div>

# 소셜독 프론트엔드
![KakaoTalk_Photo_2022-02-26-18-39-16 001 (1)](https://user-images.githubusercontent.com/61589338/177762295-fccfefd1-f17e-4c54-b9a9-12c6162b7228.png)  
서비스 주소 : https://www.oursocialdog.com/  
지역기반의 반려동물 커뮤니티 소셜독의 프론트엔드입니다.  
주변의 반려동물 보호자들과 커뮤니티를 만들고 싶어서 만든 서비스입니다.  
현재 배포되어 운영중이지만, 활성화는 이루어지지 않았습니다. 

소셜독 App의 커뮤니티 탭에 웹앱으로도 만나볼 수 있습니다.   
App 다운로드(안드로이드) : https://play.google.com/store/apps/details?id=com.socialdog   
서비스를 만들면서 구현한 기능, 해결한 문제는 블로그에 기록하였습니다.  
블로그 주소 : https://2hakjoon-mindmap.tistory.com/category/%EC%86%8C%EC%85%9C%EB%8F%85  


## 기술 스택
 * Typescript
 * React
 * Apollo Client
 * Cypress


## 데모영상
### 서비스 전체
[screen-recording (3).webm](https://user-images.githubusercontent.com/61589338/185916601-07a75162-70af-47b9-9844-dc53410fd644.webm)

### 게시글 CRUD
[screen-recording (5).webm](https://user-images.githubusercontent.com/61589338/185916610-2815c400-84ba-4102-85fb-61a4e5eb31dc.webm)

### 지역별 게시물 보기
[screen-recording.webm](https://user-images.githubusercontent.com/61589338/185916606-16530304-7b6e-4723-ba3c-1211fc587f8f.webm)

### 구독신청, 수락, 거절
[screen-recording (6).webm](https://user-images.githubusercontent.com/61589338/185916618-c841afd7-ae3c-491e-ae82-b7229a3de0a8.webm)



## 기능 구현
 - 로그인 관련  
 JWT Token사용.  
 Kakao Login Api사용.
 Apollo Client의 Error Handling을 활용하여 만료된 Token자동 갱신.

 - 사용자 관련    
 사용자 이름, 프로필 사진 변경 및 프로필 공개여부 설정.  
 다른 사용자를 구독하여 게시물을 볼 수 있음.  
 다른 사용자를 차단하여 내 프로필 및 게시물을 볼 수 없게하고, 차단한 사용자의 게시물도 볼 수 없게 할 수 있음.
 사용자의 이름을 검색하여 친구추가를 할 수 있음.
 프로필을 공개한 사람은 추천 친구로 보여줌.
  
 - 게시글 관련  
 본인이 작성한 게시물과 좋아요 누른 게시물을 프로필 화면에서 볼 수 있음.  
 게시물 작성 시, 태그하고 싶은 장소의 주소를 입력 할 수 있음.  
 사용자의 위치정보를 이용하여, 사용자 주변에서 작성된 게시물을 확인 할 수 있음.    
   
 - 신고 기능  
 게시글, 댓글 및 사용자 신고 가능.  

 - 클라이언트 사이드 캐싱
 게시물 및 유저정보 캐싱. 데이터 변경시 캐시 수정.

 - Github Action 추가.
 Pull Request후 merge시 build

 ## 폴더 구조
 ```
 └── src
    ├── cypress
    │   ├── e2e
    │   ├── component
    ├── __generated__
    ├── apllo-gqls
    ├── assets
    │   ├── png
    │   ├── styles
    │   └── svg
    ├── hooks
    ├── screen
    │   ├── comment-detail
    │   │   └── components
    │   ├── common-comp
    │   │   ├── button
    │   │   ├── dropdown
    │   │   ├── error-boundary
    │   │   ├── footer
    │   │   ├── geolocation
    │   │   ├── header
    │   │   ├── image
    │   │   ├── input
    │   │   ├── modal
    │   │   ├── no-contents
    │   │   ├── place-search
    │   │   ├── report
    │   │   ├── scroll
    │   │   ├── skeleton
    │   │   ├── texts
    │   │   ├── user-card
    │   │   └── wrappers
    │   ├── home
    │   │   ├── components
    │   │   └── templates
    │   ├── login
    │   │   └── template
    │   ├── post-detail
    │   │   ├── components
    │   │   └── template
    │   ├── post-write
    │   │   ├── components
    │   │   └── template
    │   ├── profile
    │   │   ├── components
    │   │   └── templates
    │   └── search
    ├── types
    └── utils
        └── timeformat
 ```

| 폴더           | 용도                                                                                 |
| -------------- | -----------------------------------------------------------------------------------|
| **cypress**    | 테스트 자동화를 위한 cypress코드 작성                                                     |
| **__generated__**| Apollo Tools로 자동생성된 스키마 types                                                |
| **apllo-gqls** | Apollo Client로 서버에 요청할때 필요한 Graphql 쿼리 스트링 작성                              |
| **assets**     | svg, png등 정적 파일 및 theme객체 작성                                                  |
| **common**     | 공용으로 사용하는 hook 및 컴포넌트 작성                                                    |
| **screen**     | 각 라우트 별로 component, template, hooks를 작성                                        |
| **utils**      | 공용으로 사용하는 함수들 작성                                                             |
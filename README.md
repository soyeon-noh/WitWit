# WitWit

- start: 2021.11.19

- tool setting: 2021.11.22

# API 가이드

### port 번호

> client 3000
> server 5050

# Wit

- wit CURD

- `wit` Schema
  ```json
  {
  id: { type: Number, default: 0 }, // 위트 아이디
    text: String, // 위트 텍스트 (글자수 제한)
    createdDate: String, // 위트 생성 날짜
    createdTime: String, // 위트 생성 시간
    userId: String, // 작성자 ID
    userName: String, // 작성자 이름
    profileUrl: String, // 작성자 프로필 이미지링크
    parentWit: String, // 이전 위트 id값

    folder_id: String, // 폴더 seq (외래키)
    image_id: String, // 이미지 seq (외래키)
  }
  ```
- `wit_like` Schema
  ```json
  {
  	id: string,
  	wit_id: string, // (외래키)
  	user_id: string // (외래키)
  }
  ```

`GET`/

- 모든 글들을 볼 수 있다.
- 다른사람 글 + 내 글
- 최신순
  ```json
  {
    "_id": "61b828e2b88b8f672624d039",
    "text": "강낭콩밥에 밥",
    "createdDate": "2021-12-14",
    "createdTime": "14:17:22",
    "userId": "@bob",
    "userName": "밥",
    "profileUrl": "",
    "folder_id": "",
    "image_id": "",
    "id": 31,
    "parentWit": [
      {
        "_id": "61aefd5a4cb1ac080b639088",
        "id": 7,
        "text": "속상허네요",
        "createdDate": "2021-12-07",
        "createdTime": "15:21:14",
        "userId": "@userID",
        "userName": "userNick",
        "profileUrl": "",
        "folder_id": "0a18d40f-cb7e-445e-af82-b363d87fd0a5",
        "image_id": "",
        "__v": 0
      }
    ],
    "rewit": [],
    "replyArray": [],
    "likeyCount": 0,
    "replyCount": 0
  }
  ```
  ```json
  {
  	[wit, wit, wit, ...]
  }
  ```

`GET`/search?q=${검색어}

- 검색어가 작성된 wit를 최신순으로 보여준다.
  ```json
  {
  	wit
  }
  ```

`GET`/:user_id/:id

- wit를 클릭했을 때 세부내용을 보여준다
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d70bb706-c1d6-4b3f-bf75-a3cf93b67e88/Untitled.png)
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5ff224ef-a2bc-40e5-be60-907bcb5f4cd5/Untitled.png)
  ```json
  {
  	wit,
  	replies : [wit, wit, wit ... ]
  }
  ```

`POST`/

- wit 를 작성한다
  - Request
    ```json
    {
    	text,
    	imageUrl,
    	userId // 유저 id(임시값),
    				// 로그인을 구현하면 지우고 session에서 값 가져오기
    }
    ```
  - Response
    ```json
    {
    	[wit, wit, wit ... ]
    }
    ```

`POST` /:id

- 답글 wit 를 작성한다
  - Request
    ```json
    {
    	text,
    	imageUrl
    }
    ```
  - Response
    ```json
    {
    	[wit, wit, wit ... ]
    }
    ```

`POST` /rewit/:id

- 선택한 wit를 rewit한다
  - Request
    ```json
    {}
    ```
  - Response
    ```json
    {
    	[wit, wit, wit ... ]
    }
    ```

`POST` /quote/:id

- 선택한 wit를 quote한다
  - Request
    ```json
    {
    	text
    }
    ```
  - Response
    ```json
    {
    	[wit, wit, wit ... ]
    }
    ```

`POST` /:id/:folder_id

- wit를 folder에 담는다
  - Request
    ```json
    {
    	id,
    	folder_id
    }
    ```
  - Response
    ```json
    "folder_id Update Success"
    ```

`DELETE` /:user_id/:id

- wit 를 삭제한다
  - Request
    ```jsx
    {
    	id,
    	user_id,
    }
    ```
  - Response
    ```jsx
    "Delete Success";
    ```

# Likey

`get` /:user_id/:wit_id

- 현재 유저의 해당 wit에 대한 likey 여부를 확인한다
  - Request
    ```jsx
    {
      user_id, wit_id;
    }
    ```
  - Response
    ```jsx
    {
    	true or false
    }
    ```

`post` /:user_id/:wit_id

- likey 를 추가하거나 삭제한다.
  - Request
    ```jsx
    {
      user_id, wit_id;
    }
    ```
  - Response
    ```jsx
    {
    	[likey, likey, likey, ... ]
    }
    ```

# Users

- `user` Schema
  ```json
  {
  		id: v4(), // 사용자의 고유한 아이디
  		userId: {
  				type : string,
  				trim : true,
  		} // 사용자가 작성한 아이디
  		password: {
  				type : string,
  				trim : true,
  		}, // 사용자 비밀번호
  		name: string, // 사용자 nickname
  		email: string, // 사용자 email

  		profileUrl: string // 프로필사진 (optional)
  }
  ```

`GET` /check

- 로그인 되어있는 유저를 확인합니다
  - response
  ```json
  // 로그인
  {
  	user
  }

  // 비로그인
  {
  	false
  }
  ```

`GET` /profile/:user_id

- params의 유저의 정보를 확인합니다

`POST` /login

- 회원가입 창

`POST` /join

- 회원가입하기
  - 이메일 인증
  - Request
    ```json
    {
    	userId: string,
    	password: string,
    	name: string,
    	email: stirng
    }
    ```
  - Response
    ```json
    {
    	user
    }
    ```

`POST` /logout

- 로그아웃하기

# Folder

- `folder` Schema
  ```java
  {
  	id: string,
  	user_id: string,
  	wit_id: string,
  	name: string,
  	secret : boolean,
  }
  ```

`GET`/:user_id

- 1. 내가작성한 글을 모아놓은 카테고리를 볼 수 있다.
- 사용자당 기본 카테고리가 최소한 하나씩 존재한다.
  ```json
  {
  	[cate, cate, cate, ...]
  }
  ```
- 2. 내가 작성한 글을 최신순으로 보여준다.
  ```json
  {
  	[wit, wit, wit, ... ]
  }
  ```

`GET` /:user_id

- 모든 폴더목록

`GET` /:user_id/folder/:id

- folder Detail정보

`PUT` /:user_id/folder

- 수정

`POST` /:user_id/folder

- 추가

`DELETE` /:user_id/folder/:id

- 삭제

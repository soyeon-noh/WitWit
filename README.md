# WitWit

- start: 2021.11.19

- tool setting: 2021.11.22

# 화면 구성
![image](https://user-images.githubusercontent.com/71615938/190648239-953e820f-81cb-44bc-8942-32b1c2957b96.png)
![image](https://user-images.githubusercontent.com/71615938/190648298-d4c7a0d7-14ef-424e-9272-25143de0b616.png)
![image](https://user-images.githubusercontent.com/71615938/190648412-0b1d5d00-59b4-4ec8-bad7-3cd0d2568a72.png)
![image](https://user-images.githubusercontent.com/71615938/190648444-7cfc7923-9c05-46c8-a157-a14a0a1615f1.png)
![image](https://user-images.githubusercontent.com/71615938/190648479-6f27c9e1-5cc0-40d4-8c26-cecabc9a781f.png)
![image](https://user-images.githubusercontent.com/71615938/190648601-a4ff423e-beb2-4f48-b90e-01282637299c.png)
![image](https://user-images.githubusercontent.com/71615938/190648636-aec23e9d-9041-4719-874a-f9fdd4a6aab8.png)
![image](https://user-images.githubusercontent.com/71615938/190648696-d7090b60-6308-446f-ab96-99d99a9ee5da.png)
![image](https://user-images.githubusercontent.com/71615938/190648736-a2fa6a05-e632-4a7a-90de-59522c38393f.png)
![image](https://user-images.githubusercontent.com/71615938/190648769-9e2d3b8e-066d-4fe9-bea0-31bea379df28.png)
![image](https://user-images.githubusercontent.com/71615938/190648800-d12c0e98-f153-4deb-b4d7-2169509618db.png)
![image](https://user-images.githubusercontent.com/71615938/190648844-1bb3f964-7b0f-4638-bfc9-c64de4e54d21.png)
![image](https://user-images.githubusercontent.com/71615938/190648886-969b2c24-2e28-43b8-8e17-465af008af67.png)
![image](https://user-images.githubusercontent.com/71615938/190648911-d195be8d-d5f7-45d4-8ff2-28167fb40459.png)
![image](https://user-images.githubusercontent.com/71615938/190648933-21ce8660-1229-41d8-af23-7b99beaa269f.png)
![image](https://user-images.githubusercontent.com/71615938/190648972-967a0c0f-be26-496b-ae05-5d52b1725713.png)
![image](https://user-images.githubusercontent.com/71615938/190649020-36c4b66b-8f05-4f63-82e9-a21639a9c772.png)
![image](https://user-images.githubusercontent.com/71615938/190649055-d8027882-fde1-42e6-be88-05be5256702a.png)
![image](https://user-images.githubusercontent.com/71615938/190649096-bb087228-1715-41be-bba2-970a261b6bfe.png)
![image](https://user-images.githubusercontent.com/71615938/190649121-94b6da18-ffcd-4722-8ee8-5dd8d723fbe7.png)
![image](https://user-images.githubusercontent.com/71615938/190649146-d954c8b1-1278-49b0-aec8-40d55fd41be9.png)
![image](https://user-images.githubusercontent.com/71615938/190649194-61269524-3735-46fc-a72b-c0a79d4c6265.png)


# API 가이드

### port 번호

> client 3000
> server 5050

# Wit

- wit CURD

- `wit` Schema

  ```jsx
  {
    "id": { type: Number, default: 0 }, // 위트 아이디
    "text": String, // 위트 텍스트 (글자수 제한)
    "createdDate": "String", // 위트 생성 날짜
    "createdTime": String, // 위트 생성 시간
    "userId": String, // 작성자 ID
    "userName": String, // 작성자 이름
    "profileUrl": String, // 작성자 프로필 이미지링크
    "parentWit": String, // 이전 위트 id값

    "folder_id": String, // 폴더 seq (외래키)
    "image_id": String, // 이미지 seq (외래키)
  }
  ```

- `wit_like` Schema
  ```jsx
  {
  	"id": string,
  	"wit_id": string, // (외래키)
  	"user_id": string // (외래키)
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
  ```jsx
  {
  	[wit, wit, wit, ...]
  }
  ```

`GET`/search?q=${검색어}

- 검색어가 작성된 wit를 최신순으로 보여준다.
  ```jsx
  {
    wit;
  }
  ```

`GET`/:user_id/:id

- wit를 클릭했을 때 세부내용을 보여준다
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d70bb706-c1d6-4b3f-bf75-a3cf93b67e88/Untitled.png)
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5ff224ef-a2bc-40e5-be60-907bcb5f4cd5/Untitled.png)
  ```jsx
  {
  	wit,
  	"replies" : [wit, wit, wit ... ]
  }
  ```

`POST`/

- wit 를 작성한다
  - Request
    ```jsx
    {
      text, imageUrl, userId; // 유저 id(임시값),
      // 로그인을 구현하면 지우고 session에서 값 가져오기
    }
    ```
  - Response
    ```jsx
    {
    	[wit, wit, wit ... ]
    }
    ```

`POST` /:id

- 답글 wit 를 작성한다
  - Request
    ```jsx
    {
      text, imageUrl;
    }
    ```
  - Response
    ```jsx
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
    ```jsx
    {
    	[wit, wit, wit ... ]
    }
    ```

`POST` /quote/:id

- 선택한 wit를 quote한다
  - Request
    ```jsx
    {
      text;
    }
    ```
  - Response
    ```jsx
    {
    	[wit, wit, wit ... ]
    }
    ```

`POST` /:id/:folder_id

- wit를 folder에 담는다
  - Request
    ```jsx
    {
      id, folder_id;
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

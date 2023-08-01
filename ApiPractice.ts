import { ApolloServer, ApolloServerOptions } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DataSource } from 'typeorm'
import { Board } from './Board.postgres'

// api-docs부분
const typeDefs = `#graphql
  # 인자로 들어가는 type은 type이 아니라 input으로 해주어야 함
  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type MyBoard {
    id: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoard: [MyBoard]
  }

  type Mutation {
    # 연습용(example방식)
    # createBoard(writer: String, title: String, contents: String): String!
    
    # 실무용(practice방식) - 객체를 만들어서 보기좋게 지정
    createBoard(createBoardInput: CreateBoardInput): String!
  }
`;

// api 만들기
const resolvers = {
  Query: {
    fetchBoard : async () => {
      // 1. 모두 꺼내기
      const result = await Board.find( where: { isDelet: false})
      console.log(result)
      
      // 2. 한 개만 꺼내기
      // const result = await Board.find({ where: {id : 3}})

      return result;
    },
  },
  
  Mutation: {
    // 브라우저에서 요청이 오면 args에 인자가 들어오고
    // api 끼리 호출 하게 되면 parent에 들어오게 된다
    createBoard: async (parent: any, args: any, context: any, info: any) => {
      await Board.insert({
        // 앞의 인자가 같으니 스프레드 연산자로 줄이기
        ...args.createBoardInput,

        // 하나씩 지정했을 때
        // writer: args.createBoardInput.writer,
        // title : args.createBoardInput.title,
        // contents: args.createBoardInput.contents,
      
      });

      // createBoard안에서 다른 api불러오기
      // fetchBoard("철수")

      return "게시글 등록에 성공했어요"
    },

    updataBoard: async () => {
      // 3번 게시글을 영희로 바꿔줘!
      await Board.update({ id: 3}, {writer: "영희"});
    },

    deleteBoard: async () => {
      // 방법1 - 완전삭제
      await Board.delete({ id:3}); // 3번 게시글 삭제해줘!
      // 방법2 - soft delete - 단점 : 삭제가 언제 된지 모름
      await Board.update({ id:3}, {isDeleted: true}); // 3번 게시글 삭제했다 치는 방법! 왜냐하면 실제로 삭제했다가 나중에 복구가 힘들기 때문에
      // 방법3 - soft delete이후 삭제한 날짜 기입해주기
      await Board.update({id:3}, {deletedAt: new Date() }) // deletedAt이 초기값이 Null 이면? 삭제 안된거, new Date() 들어가 있으면 삭제된 것
      //위와 같은 방식으로 업데이트 한 이후 .find 에서 찾을때 where: {isDelete: false} 이렇게로 fetchBoard를 함
    },
  },
};

// @ts-ignore
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,

  // 선택한 사이트만 풀어주고 싶을때
  // cors: {
    // origin: ["http://naver.com", "http://coupang.com"]
  // }
} as ApolloServerOptions<any>);

const AppDataSource = new DataSource({
  type: "postgres",
  host: "34.64.244.122",
  port: 5001,
  username: "postgres",
  password: "postgres2022",
  database: "postgres",
  entities: [Board],
  synchronize: true, // 동기화 하는걸 허락해줘
  logging: true, // 우리의 명령어가 어떻게 sql명령어로 바뀌는지 추적
})

AppDataSource.initialize().then(() => {
  console.log("DB접속에 성공했습니다");
  startStandaloneServer(server).then(() => {
    console.log("그래프큐엘 서버가 실행되었습니다!!") // 포트: localhost:4000으로 실행이 됨
  });
}).catch((error) => {
  console.log("실패했습니다", error);
})
// 이렇게 db연결이 되면 api가 실행되게 해야함
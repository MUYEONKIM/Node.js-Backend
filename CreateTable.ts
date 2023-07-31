import { DataSource } from 'typeorm'
import { Board } from './Board.postgres'

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
}).catch((error) => {
  console.log("실패했습니다", error);
})
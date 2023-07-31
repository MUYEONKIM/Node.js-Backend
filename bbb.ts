const qqq: string = "안녕하세요";
console.log(qqq);

// 타입스크립트 이용시
// 타입스크립트 설치
// tsconfig.json설치
// 기존에 next.js에서는 tsconfig.json을 yarn dev하면 알아서 만들어줌
// 하지만 지금은 next.js에서 실행하는것이 아니기 때문에 직접 만들어야함
// 그래서 타입스크립트 홈페이지 가면 guide가 있음

// node는 typescript실행프로그램이 아닌 javascript실행 프로그램임 그래서 오류가 남
// 1. 타입스크립트 => 자바스크립트로 바꾸기
// 2. 타입스크립트 실행프로그램 다운받기 (ts-node) yarn add ts-node

// 기존의 node같은 경우는 컴퓨터 전체에 설치해서 어디에서든지 node라고 명령어를 쳐서 실행가능하지만
// ts-node같은경우는 해당 폴더에서만 설치했기 때문에 실행시키기가 번거로움
// 따라서 이럴때는 package.json에서 scripts : {} 사이에 명령어를 넣어서 쉽게 실행시켜버리기 가능
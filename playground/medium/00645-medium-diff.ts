/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #보통 #object

  ### 질문

  `O` & `O1`의 차이점인 `객체`를 가져옵니다

  > GitHub에서 보기: https://tsch.js.org/645/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type Common<O, O1> = {
  [key in keyof O extends keyof O1 ? keyof O : keyof O1 extends keyof O ? keyof O1 : keyof O1 extends keyof O ? keyof O1 : keyof O extends keyof O1 ? keyof O : never]:
  key extends keyof O ? key extends keyof O1 ? O1[key] : never : never;
}
type DistributedKey<T, K extends keyof T = keyof T> = K extends K ? K : never
type Diff<O, O1> = {
  [key in Exclude<DistributedKey<O> | DistributedKey<O1>, keyof Common<O, O1>>]: key extends keyof O ? O[key] : key extends keyof O1 ? O1[key] : never
}

type Result<T, U> = {
  [key in Exclude<DistributedKey<T> | DistributedKey<U>, keyof Common<T, U>>]: key extends keyof T ? T[key] : key extends keyof U ? U[key] :
    key extends keyof U ? U[key] : key extends keyof T ? T[key] : never;
}
type Test = Result<Foo, Bar>
type _Test = DistributedKey<Foo> | DistributedKey<Bar>
type __Test = keyof Common<Foo, Bar>
type __Test2 = keyof Common<Bar, Foo>
type __Test3 = keyof Common<Foo, Coo>
type __Test4 = keyof Common<Coo, Foo>
type $Test = Exclude<DistributedKey<Foo> | DistributedKey<Bar>, keyof Common<Foo, Bar>>
type ___Test = Result<Foo, Bar>
type ___Test2 = Result<Bar, Foo>
type ___Test3 = Result<Foo, Coo>
type ___Test4 = Result<Coo, Foo>

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/645/answer/ko
  > 정답 보기: https://tsch.js.org/645/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

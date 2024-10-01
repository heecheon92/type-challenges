/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #보통 #object

  ### 질문

  `O` & `O1`의 차이점인 `객체`를 가져옵니다

  > GitHub에서 보기: https://tsch.js.org/645/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

type Common<O, O1, K extends keyof O = keyof O, K1 extends keyof O1 = keyof O1> = {
  [key in K extends K1 ? K1 extends K ? K1 : K :
    K1 extends K ? K extends K1 ? K : K1 : never
  ]:
  key extends keyof O ? key extends keyof O1 ? O1[key] : never : never;
}
type DistributedKey<T, K extends keyof T = keyof T> = K extends K ? K : never
type Diff<O, O1> = {
  [key in Exclude<DistributedKey<O & O1> , keyof Common<O, O1>>]: key extends keyof O ? O[key] : key extends keyof O1 ? O1[key] : never
}

/**
 * 위 풀이로 풀었으나 더 간결하게 푼이의 답변을 살펴보자
 * 
 *    type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>
 * 
 * 내가 작성한 답변보다 훨씬 간결하다. 무엇을 놓쳐서 이런 답변을 생각하지 못했을까?
 * 
 *    - type Result = keyof (Foo | Bar) 
 * 
 * 여기서 Result 타입은 어떤 타입으로 resolve되는지 살펴보자.
 * 얼핏 봤을때, Foo는 "name" | "age" 키를 갖고 있고
 * Bar는 "name" | "age" | "gender" 키를 갖고 있다. 이는 마치
 * {name: string, age: string} | {name: string, age: string, gender: number} 이므로 
 * keyof (Foo | Bar) 는 "name" | "age" | "gender"로 평가되어야 할것 처럼 보인다.
 * 
 * 하지만 정작 resolve된 타입은 "name" | "age" 로 평가된다. 타입 생성시 "|"는 논리적으로 Or의 기능이지만
 * keyof 연산자를 유니온 타입에 적용시 각 유니온 공통적으로 갖고 있는 키값만 표출하게 된다. (유니온에 포함되는 타입중 가장 좁은 타입)
 * 이러한 동작 방식을 알지 못해서 Common 타입을 따로 구축하는 상황을 만든것이다.
 * 다음 항목들의 차이점에 대해서 익혀두자.
 * 
 *    - type Result = keyof (Foo | Bar)
 *      //    ^?  Result = "name" | "age"
 * 
 *    - type Result = keyof Foo | keyof Bar // "name" | "age" | "gender"
 *      //    ^?  Result = "name" | "age" | "gender"
 * 
 *    - type Result = keyof (Foo & Bar)
 *      //    ^?  Result = "name" | "age" | "gender"
 * 
 *    - type Result = keyof Foo & keyof Bar
 *      //    ^?  Result = "name" | "age"
 */

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

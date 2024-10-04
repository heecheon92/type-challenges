/*
  2757 - PartialByKeys
  -------
  by jiangshan (@jiangshanmeta) #보통 #object

  ### 질문

  두 개의 타입 인수 `T`와 `K`를 사용하는 `PartialByKeys<T, K>`를 구성하세요.

  `K`는 옵셔널하며 `T`의 프로퍼티로 이루어진 유니언 타입을 지정할 수 있습니다. `K`를 제공하지 않는다면 `Partial<T>`와 같이 모든 프로퍼티를 옵셔널하게 만들어야 합니다.

  예시

  ```typescript
  interface User {
    name: string
    age: number
    address: string
  }

  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
  ```

  > GitHub에서 보기: https://tsch.js.org/2757/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

/**
 * Normalize는 Intersection으로 병합된 타입을 단일 타입으로 나타내는 용도. i.e.
 *
 *  type A = {
 *    name: string
 *  }
 *
 *  type B = {
 *    age: number
 *  }
 *
 *  type C = A & B => { name: string } & { age: number} 형태로 resolve 됨
 *
 *  type D = Normalize<A & B> = { name: string; age: number; } 형태로 resolve됨
 *
 *  Equal 타입은 굉장히 strict 하므로 구조적으론 C 와 D 가 같지만 명시적으론 다르다고 인식하는것 같다.
 *
 */
type Normalize<T> = { [K in keyof T]: T[K] }
type PartialByKeys<T, K extends keyof T = keyof T> = Normalize<{
  [P in keyof T as P extends K ? never : P]: T[P];
} & {
  [P in keyof T as P extends K ? P : never]?: T[P] | undefined
}>

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/2757/answer/ko
  > 정답 보기: https://tsch.js.org/2757/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

/*
  12 - Chainable Options
  -------
  by Anthony Fu (@antfu) #보통 #application

  ### 질문

  체인 가능 옵션은 일반적으로 Javascript에서 사용됩니다. 하지만 TypeScript로 전환하면 제대로 구현할 수 있나요?

  이 챌린지에서는 `option(key, value)`과 `get()` 두가지 함수를 제공하는 객체(또는 클래스) 타입을 구현해야 합니다. 현재 타입을 `option`으로 지정된 키와 값으로 확장할 수 있고 `get`으로 최종 결과를 가져올 수 있어야 합니다.

  예시

  ```ts
  declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // 결과는 다음과 같습니다:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```

  문제를 해결하기 위해 js/ts 로직을 작성할 필요는 없습니다. 단지 타입 수준입니다.

  `key`는 `string`만 허용하고 `value`는 무엇이든 될 수 있다고 가정합니다. 같은 `key`는 두 번 전달되지 않습니다.

  > GitHub에서 보기: https://tsch.js.org/12/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

/**
 * WA - 추후 Upsolve 필요.
 */
type __Chainable = {
  option<T>(key: string, value: T): Chainable & Record<string, T>
  get<T>(): T
}

/**
 * https://github.com/type-challenges/type-challenges/issues/15337
 * 감이 잘 안잡히므로, 빡고수의 풀이과정을 살펴보자.
 *
 * 이게 맨 처음 주어지는 베이스 타입인데 여기에서 "get"의 시그니쳐를 수정한다.
 *
 * type Chainable = {
 *   option(key: string, value: any): any
 *   get(): any
 * }
 * -------------------------------------------------------------
 *
 * 1. 아직 미정의 타입 R을 get의 반환으로 세팅
 *
 * type Chainable<R = object> = {
 *   option(key: string, value: any): any
 *   get(): R
 * }
 *
 * -------------------------------------------------------------
 *
 * 2. option 함수 호출 이후 method chaining이 가능해야 하므로
 * option의 반환 타입을 Chainable로 정의
 *
 * type Chainable<R = object> = {
 *   option(key: string, value: any): Chainable
 *   get(): R
 * }
 *
 * -------------------------------------------------------------
 *
 * 3. 내가 시도 했을때 여기쯤에서 막혔음.... 아무튼 key-value (이하 Record)에서
 * value의 타입은 다양할 수 있고, option 호출시마다 해당 타입정보를 유지해야 하므로
 * option 함수의 시그니쳐를 변경
 *
 *    type Chainable<R = object> = {
 *      option<K extends string, V>(key: K, value: V): Chainable<R & Record<K, V>>
 *      get(): R
 *    }
 *
 * -------------------------------------------------------------
 *
 * 4. 중복된 키가 들어오지 못하도록 설계해야 하는데 혼자 시도했을땐 위 3번에서 막혀서
 * 시도해 보진 않았지만.
 *
 *     a. option<K extends string, V>     (key: K, value: V)
 *     b. option<K extends keyof any, V>  (key: K extends keyof R ? never : K, value: V)
 *
 * a -> b로 시그니쳐 수정을 했다. 여기서 "key: K extends keyof R ? never : K" 이 부분이 중첩키를 방지하는
 * 시그니쳐 인데.... option 함수의 generic placeholder는 "K extends string"에서 "K extends keyof any"로
 * 바꾼건지는 잘 이해가 안간다.
 *
 *    type Chainable<R = object> = {
 *      option<K extends keyof any, V>(key: K extends keyof R ? never : K, value: V): Chainable<R & Record<K, V>>
 *      get(): R
 *    }
 *
 * -------------------------------------------------------------
 *
 * 5. 정정 다른 코멘터들이 "K extends keyof any"로 변경 하는 과정은 필요 없다고 한다.
 *
 *    type Chainable<R = object> = {
 *      option<K extends string, V>(key: K extends keyof R ? never : K, value: V): Chainable<R & Record<K, V>>
 *      get(): R
 *    }
 *
 * -------------------------------------------------------------
 *
 * 6. 중첩된 키라도 value의 타입이 다르면 마지막의 들어온 key-value로 덮어 쓴다.
 *
 *    type Chainable<R = object> = {
 *      option<K extends string, V>(
 *        key: Exclude<K, keyof R>,
 *        value: V
 *      ): Chainable<Omit<R, K> & Record<K, V>>;
 *      get(): R;
 *    };
 *
 */

type Chainable<R = object> = {
  option<K extends string, V>(
    key: Exclude<K, keyof R>,
    value: V
  ): Chainable<Omit<R, K> & Record<K, V>>
  get(): R
}

/* _____________ 테스트 케이스 _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/12/answer/ko
  > 정답 보기: https://tsch.js.org/12/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

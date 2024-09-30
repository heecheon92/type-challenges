/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #보통 #union

  ### 질문

  주어진 유니언 타입을 순열 배열로 바꾸는 Permutation 타입을 구현하세요.

  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```

  > GitHub에서 보기: https://tsch.js.org/296/ko
*/

/* _____________ 여기에 코드 입력 _____________ */

/**
 * WA, 자력솔 실패 upsolving 필요.
 */
type __Permutation<T> =
  [T] extends [never] ? [] :
    T extends infer R ? [R] :
      T extends infer R1 | infer R2 ? [R1, R2] :
        T extends infer R1 | infer R2 | infer R3 ? [R1, R2, R3] : []

/**
 * 이번 문제는 감이 잘 안잡히므로 해답과 디테일한 설명을 올려논 빡고수의 글을 보자.
 * https://github.com/type-challenges/type-challenges/issues/614
 *
 * solution:
 *
 *  type Permutation<T, K=T> =
 *    [T] extends [never]
 *      ? []
 *      : K extends K
 *        ? [K, ...Permutation<Exclude<T, K>>]
 *        : never
 *
 * 1. "T extends never ? U : V" 는 예상대로 동작하지 않는다.
 *    a. 조건부 "extends" 문에서 T는 distribution law를 따른다. 예를 들어,
 *       (A | B) extends C ? D : E 같은 경우는 다음의 갈래로 분기처리된다.
 *        (A extends C ? D : E) | (B extends C ? D : E)
 *    b. 이때, "T extends never ? U : V" 구문 T 자리에 never가 온다고 가정해보자.
 *       never extends never ? U : V 이 경우, 타입스크립트는 never에
 *       distribution law를 적용하지 않고 바로 never 타입을 반환한다.
 *
 *        - type NeverIsNever = never extends never ? "yes" | "no"    // "yes"
 *        - type ExtendsNever<T> = T extends never ? "yes" | "no"
 *        - type IsNever = ExtendsNever<{}>   // "no"
 *        - type IsNever = ExtendsNever<never>    // never
 *
 *    c. never가 조건부 T로 이용될시 distribution law가 적용되지 않는 점 때문에
 *       보통 다음과 같이 우회해서 체크한다.
 *
 *        - [T] extends [never] ? A : B
 *
 *       이때 [never]는 never 타입이 아닌 "Tuple" 타입으로 never의 예외 룰을 우회할 수 있다.
 *
 * 2. K extends K 또한 고급 타입생성 기법중 하나이다.
 *    K extends K는 항상 true이지만 타입스크립트는 K에 종속되는 Union타입들을 분해해해서 마치 루프를
 *    돌아가듯이 각각 K에 종속되는 Union Element Type을 평가한다.
 *
 *    psudocode:
 *      type Distribute<T> = T extends T ? T : never;
 *      type SomeNumbers = Distribute<1 | 2 | 3 | 4>;     // 1 | 2 | 3 | 4
 *          - for t in T
 *          - for t in 1 | 2 | 3 | 4
 *          - for 1 in 1 | 2 | 3 | 4
 *          - for 2 in 1 | 2 | 3 | 4
 *          - for 3 in 1 | 2 | 3 | 4
 *          - for 4 in 1 | 2 | 3 | 4
 */

type Permutation<T, K = T> =
    [T] extends [never]
      ? []
      : K extends K
        ? [K, ...Permutation<Exclude<T, K>>]
        : never

/* _____________ 테스트 케이스 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]

/* _____________ 다음 단계 _____________ */
/*
  > 정답 공유하기: https://tsch.js.org/296/answer/ko
  > 정답 보기: https://tsch.js.org/296/solutions
  > 다른 문제들: https://tsch.js.org/ko
*/

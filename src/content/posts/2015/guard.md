---
date: "2015-12-14"
title: "Swift2のguardが便利そう"
tags: ["swift", "iOS", "Xcode", "Swift2"]
excerpt: "Swiftの新しい構文guardについて調べてみた話"
---

# Swift2のguardが便利そう

swift2から`guard`が使えるようになった。

> A guard statement is used to transfer program control out of a scope if one or more conditions aren’t met.

Appleの公式レファレンスには上記のように書かれていた。

## 使用例

### Swift1.2

OptionalなInt値で、numを受け取る関数はちょっと書くのが面倒だった

```
func sample(num: Int?) {
  if num == nil {
    return
  }
  
  // numがnilでなかったら
  // numをInt値をして以下を実行
  let n = num!
  print(n)
}
```

こういうのよくありますよね...

### Swift2

guardを使えば、わかりやすく綺麗に書くことができる

```
func sample(num: Int?) {
  guard let n = num else {
    return
  }
  print(n)
}
```

## もう少し複雑な使用例

- reachableかつconnectedかつ、お客様の数が0より大きい時に処理を実行したい

### Swift1.2

```
func fetchListOfCustomers(customers: [Customer]?) {
    if !reachable { 
      return 
    }
    if !connected { 
      return 
    }
    if let customers = customers where customers.count > 0 {
        // Do it!
        print(customers)
    }
}
```

### Swift2

```
func fetchListOfCustomers(customers: [Customer]?) {
    guard reachable else { 
      return 
    }
    guard connected else { 
      return 
    }
    guard let customers = customers where customers.count > 0 else { 
      return 
    }

    // Do it!
    print(customers)
}
```

もう少し簡潔に書くと

```
func fetchListOfCustomers(customers: [Customer]?) {
    guard reachable && connected,
          let customers = customers where customers.count > 0 else {
        return      
    }

    // Do it!
    print(customers)
}
```

## 複雑な使用例2

- 配列の中の値を取り出す
- 値がnilの時はなにもしたくない

### Swift1.2

```
let maybeNumbers: [Int?] = [3, 7, nil, 12, 40]
 
for maybeValue in maybeNumbers {
    if let value = maybeValue {
        print(value)
    } else {
        print("No Value")
    }
}

// 出力結果
// 3
// 7
// No Value
// 12
// 40
```

### Swift2

```
let maybeNumbers: [Int?] = [3, 7, nil, 12, 40]
 
for maybeValue in maybeNumbers {
    guard let value = maybeValue else {
        print("No Value")
        continue
    }
    print(value)
}
// 出力結果
// 3
// 7
// No Value
// 12
// 40
```

もしnilが出た時点で、for文のループ止めたいなら

```
let maybeNumbers: [Int?] = [3, 7, nil, 12, 40]
 
for maybeValue in maybeNumbers {
    guard let value = maybeValue else {
        print("No Value")
        break
    }
    print(value)
}
// 出力結果
// 3
// 7
// No Value
```

guardをきちんと使えば、コードの可視性があがりそうですね^^

----

## 参考文献

- [Swift 2.0 で追加されたguard の有効利用](http://furuya02.hatenablog.com/entry/2015/08/15/102224)
- [Match Me if you can: Swift Pattern Matching in Detail.](http://appventure.me/2015/08/20/swift-pattern-matching-in-detail/)
- [Swift 2.0: Exit Early With guard](http://code.tutsplus.com/tutorials/swift-20-exit-early-with-guard--cms-24326)
- [The Guard Statement in Swift 2
](http://www.codingexplorer.com/the-guard-statement-in-swift-2/)

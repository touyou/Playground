import UIKit

class Variable<T> {
    var data: T

    init(_ data: T) {
        self.data = data
    }
}

class Function<T> {

    func exec(_ input: Variable<T>) -> Variable<T> {
        let x = input.data
        let y = self.forward(x)
        return Variable(y)
    }

    func forward(_ x: T) -> T {
        fatalError("No impelemnted")
    }
}

class Square<T>: Function<T> where T: FloatingPoint {

    override func forward(_ x: T) -> T {
        return x * x
    }
}

// WIP: Step3

//class Exp<T>: Function<T> where T: FloatingPoint {
//
//    override func forward(_ x: T) -> T {
//        return exp(x)
//    }
//}

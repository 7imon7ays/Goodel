# Godel

I was tired of referring to documentation for my Google App scripts. So I made
an ORM. 'Google Model' = 'Godel'

## Usage

Given a sheet named "Logicians" and the table below starting at the origin A1:

|       |     A     |     B    |     C    |
|-------|-----------|----------|----------|
| **1** | firstName | lastName |  country |
| **2** | David     | Hilbert  |  Germany |
| **3** | George    | Boole    |  Britain |
| **4** | Alfred    | Tarski   |  Poland  |
| **5** | Augustus  | De Morgan|  Britain |


```js
// "Students" is the name of a sheet in the active spreadsheet
var Logician = new Godel.Model("Logicians") 

var alf = Logician.findBy({ firstName: "Alfred", lastName: "Tarsky" });
var brits = Logician.findWhere({ country: "Britains" });

var al = { firstName: "Alan", lastName: "Turing" }
Logician.create(al);
```

## Contributing

0. Fork it ( https://github.com/7imon7ays/godel/fork )
0. Create your feature branch (`git checkout -b my-new-feature`)
0. Commit your changes (`git commit -am 'Add some feature'`)
0. Push to the branch (`git push origin my-new-feature`)
0. Create a new Pull Request


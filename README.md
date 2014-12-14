# Godel

I was tired of referring to documentation for my Google App scripts. So I made
an ORM. 'Google Model' = 'Godel'

## Usage

```js
// "Students" is the name of a sheet in the active spreadsheet
var Student = new Godel.Model("Students") 

var will = Student.findBy({ firstName: "William", age: "20" });
var twenyYearOlds = Student.findWhere({ age: "20" });

var joe = { firstName: "Joseph", lastName: "Bloggs" }
Student.create(joe);
```

## Contributing

0. Fork it ( https://github.com/[my-github-username]/dears3/fork )
0. Create your feature branch (`git checkout -b my-new-feature`)
0. Commit your changes (`git commit -am 'Add some feature'`)
0. Push to the branch (`git push origin my-new-feature`)
0. Create a new Pull Request


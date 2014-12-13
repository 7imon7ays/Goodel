# Godel

I was tired of referring to documentation for my Google App scripts. So I'm
making an ORM. *In progress...*

## Usage

```js
// "Students" is the name of a sheet in the active spreadsheet
var Student = new Godel.Model("Students") 

var will = Student.findBy({ firstName: "William", age: "20" });

var joe = { firstName: "Joseph", lastName: "Bloggs" }
Student.create(joe);
```


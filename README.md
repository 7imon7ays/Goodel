# Goodel

[Google Apps Script][apps script] is powerful. Similar to Microsoft's VBA, it
programmatically queries Google services such a Drive, Forms, Analytics, and
Mail with minimal setup.

Google Sheets works well as a database for these scripts\*, but querying records
by rows and columns is no fun. **Goodel** hides the querying under a familiar
object-oriented API.

\* *If you're wondering, Google Apps Script has a service called [JDBC][jdbc]
that can connect to a cloud database. However you'll have to set up your SQL
server or pay for Google Cloud SQL. Note that JDBC is just a driver, not an ORM.*

[apps script]: https://developers.google.com/apps-script/
[jdbc]: https://developers.google.com/apps-script/guides/jdbc

## Why use Goodel?

Do you often fight the urge to automate every repetitive task you come across?
Do you sometimes wish you could replace all the spreadsheets in your life with
custom web apps?

![xkcd: the general problem](http://imgs.xkcd.com/comics/the_general_problem.png)

Google App Script narrows the gap between what a web app and what a spreadsheet
can do. Goodel goes one step further and makes the two equally enjoyable.
Perfect for rapid prototyping and automating administrative tasks.

## Set up

From your Google scripts editor, click "Resources > Libraries", then enter
`MX4aQpaRvsS-JcZN6JrngxPZd3ZQaD1Xq` (this project's key) in the search field
and click "Select". Goodel will appear in your included libraries. Select the
latest version from the corresponding dropdown menu and hit "Save". You're
ready to go!

*Note: Loading functions from external libraries seems not to work for some.
This is a [known issue][google library bug discussion] as of December 2014.
If the libraries' variables are undefined in your script, you can simply add the
`goodel.gs` file to your project.*

[google library bug discussion]: https://code.google.com/p/google-apps-script-issues/issues/detail?id=3778

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
// "Logicians" is the name of a sheet in the active spreadsheet
var Logician = Goodel("Logicians");

var alf = Logician.findBy({ firstName: "Alfred", lastName: "Tarski" });
alf.country // => "Poland"
var brits = Logician.findWhere({ country: "Britain" });
brits.length // => 2

var al = new Logician({ firstName: "Alan", lastName: "Turing" });
al.save(); // "Logician.create(al)" also works.
```

Works with arbitrary numbers of rows and columns.

## Contributing

0. Fork it ( https://github.com/7imon7ays/goodel/fork )
0. Create your feature branch (`git checkout -b my-new-feature`)
0. Commit your changes (`git commit -am 'Add some feature'`)
0. Push to the branch (`git push origin my-new-feature`)
0. Create a new Pull Request


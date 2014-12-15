# Goodel

Google App Script is pretty powerful. With very little setup it can
programmatically query services such as Google Drive, Google Forms and Google
Mail. Google Sheets can stand in as your database, but querying records by rows
and columns is no fun. **Goodel** hides that busywork under a familiar API so you
can focus on the good stuff.

## Set up

From your Google scripts editor, click "Resources > Libraries", then enter
`MX4aQpaRvsS-JcZN6JrngxPZd3ZQaD1Xq` (this project's key) in the search field
and click "Select". Goodel will appear in your included libraries. Select the
latest version from the corresponding dropdown menu and hit "Save". You're
ready to go!

*Note: Loading functions from external libraries seems not to work for some.*
*This is a [known issue][google library bug discussion] as of December 2014.*
*If the libraries' variables are undefined in your script, you can simply add the*
*`goodel.gs` file to your project.*

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
// "Students" is the name of a sheet in the active spreadsheet
var Logician = Goodel.Model("Logicians");

var alf = Logician.findBy({ firstName: "Alfred", lastName: "Tarski" });
var brits = Logician.findWhere({ country: "Britain" });

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


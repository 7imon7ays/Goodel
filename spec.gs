// https://sites.google.com/site/scriptsexamples/custom-methods/gsunit

function test () {
  var StudentModel = new Godel.Model("Students");

  var wills = StudentModel.findBy({ FirstName: "William" });
  
  GSUnit.assertArrayEqualsIgnoringOrder("Finds records by attribute",
                                        wills,
                                        [{
                                          MustPing: true, Email: "", FirstName: 'William',
                                          LastName: 'Penn', City: 'NY', LastEmailed: ""
                                         },
                                         {
                                          MustPing: true, Email: "", FirstName: 'William',
                                           LastName: 'Blake', City: 'SF', LastEmailed: ""
                                         }
                                        ]
                                       );
  
  var joe = { FirstName: "Joseph", LastName: "Blogs", City: "LA" };
  StudentModel.create(joe);
  
  GSUnit.assertEquals("Adds records by attribute",
                      joe['FirstName'],
                      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Students").getRange(22, 1).getValue()
                     );
}


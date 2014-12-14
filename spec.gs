// https://sites.google.com/site/scriptsexamples/custom-methods/gsunit

function testManSearch () {
  var StudentModel = new Godel.Model("Students");

  var will = StudentModel.findWhere({ FirstName: "William", City: "SF" }),
      wills = StudentModel.findWhere({ FirstName: "William" }); 

  GSUnit.assertArrayEquals("Finds single record by attribute",
                            will, {
                              MustPing: true, Email: null,
                              FirstName: 'William', LastName: 'Blake',
                              City: 'SF', LastEmailed: null
                             }
                             );

  GSUnit.assertArrayEqualsIgnoringOrder("Finds multiple records by attribute",
                                        wills,
                                        [{
                                          MustPing: true, Email: null, FirstName: 'William',
                                          LastName: 'Penn', City: 'NY', LastEmailed: null
                                         },
                                         {
                                          MustPing: true, Email: null, FirstName: 'William',
                                           LastName: 'Blake', City: 'SF', LastEmailed: null
                                         }
                                        ]
                                       );
}

function testCreate () {
  var StudentModel = new Godel.Model("Students"),
      joe = { FirstName: "Joseph", LastName: "Blogs", City: "LA" };

  StudentModel.create(joe);

  GSUnit.assertEquals("Adds records by attribute",
                      joe['FirstName'],
                      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Students").getRange(22, 1).getValue()
                     );
}

function testNativeSearch () {
  var StudentModel = new Godel.Model("Students"),
      will = StudentModel.table.natFindWhere({ FirstName: "William", City: "SF" }),
      wills = StudentModel.table.natFindWhere({ FirstName: "William" });

  GSUnit.assertArrayEquals("Finds single record by attribute",
                            will, {
                              MustPing: true, Email: null,
                              FirstName: 'William', LastName: 'Blake',
                              City: 'SF', LastEmailed: null
                             }
                             );

  GSUnit.assertArrayEqualsIgnoringOrder("Finds multiple records by attribute",
                                        wills,
                                        [{
                                          MustPing: true, Email: null, FirstName: 'William',
                                          LastName: 'Penn', City: 'NY', LastEmailed: null
                                         },
                                         {
                                          MustPing: true, Email: null, FirstName: 'William',
                                           LastName: 'Blake', City: 'SF', LastEmailed: null
                                         }
                                        ]
                                       );
}


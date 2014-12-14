// GSUnit documentation:
// https://sites.google.com/site/scriptsexamples/custom-methods/gsunit

function testManSearch () {
  var Logician = new Godel.Model("Logicians");

  var alf = Logician.findBy({ firstName: "Alfred", lastName: "Tarski" }),
      brits = Logician.findWhere({ country: "Britain" });

  GSUnit.assertObjectEquals("Finds single record by attribute",
                            alf, { lastName: "Tarski", firstName: "Alfred", country: "Poland" }
                             );

  GSUnit.assertArrayEqualsIgnoringOrder("Finds multiple records by attribute",
                                        brits,
                                        [{ firstName: 'George', lastName: 'Boole', country: 'Britain' },
                                         { firstName: 'Augustus', lastName: 'De Morgan', country: 'Britain' }
                                        ]
                                       );
}

function testCreate () {
  var Logician = new Godel.Model("Logicians"),
      al = { firstName: "Alan", lastName: "Turing" };

  Logician.create(al);

  GSUnit.assertEquals("Adds records by attribute",
                      al['firstName'],
                      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logicians").getRange(6, 1).getValue()
                     );
}

function testNativeSearch () {
  var Logician = new Godel.Model("Logicians"),
      alf = Logician.table.natFindWhere({ firstName: "Alfred", lastName: "Tarski" }),
      brits = Logician.table.natFindWhere({ county: "Britain" });

  GSUnit.assertArrayEquals("Finds single record by attribute",
                            alf, { firstName: 'Alfred', lastName: 'Tarski', country: 'Poland' }
                             );

  GSUnit.assertArrayEqualsIgnoringOrder("Finds multiple records by attribute",
                                        brits,
                                        [{ firstName: 'George', lastName: 'Boole', country: 'Britain' },
                                         { firstName: 'Augustus', lastName: 'De Morgan', country: 'Britain' }
                                        ]
                                       );
}


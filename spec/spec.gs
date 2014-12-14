// GSUnit documentation:
// https://sites.google.com/site/scriptsexamples/custom-methods/gsunit

function testManualSearch () {
  var Logician = new Goodel.Model("Logicians");

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
  var Logician = new Goodel.Model("Logicians"),
      al = { firstName: "Alan", lastName: "Turing" };

  Logician.create(al);

  GSUnit.assertEquals("Adds records by attribute",
                      al['firstName'],
                      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logicians").getRange(6, 1).getValue()
                     );
}

function testNativeFindBy () {
  var Logician = new Goodel.Model("Logicians"),
      alf = Logician.table.natFindBy({ firstName: "Alfred", lastName: "Tarski" });
  GSUnit.assertObjectEquals("Finds single record by attribute",
                            alf, { lastName: 'Tarski', firstName: 'Alfred', country: 'Poland' }
                             );
}

function testNativeFindWhere () {
    var Logician = new Goodel.Model("Logicians"),
        brits = Logician.table.natFindWhere({ country: "Britain" });

    GSUnit.assertArrayEqualsIgnoringOrder("Finds multiple records by attribute",
                                        brits,
                                        [{ firstName: 'George', lastName: 'Boole', country: 'Britain' },
                                         { firstName: 'Augustus', lastName: 'De Morgan', country: 'Britain' }
                                        ]
                                       );

}


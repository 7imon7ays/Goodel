// GSUnit documentation:
// https://sites.google.com/site/scriptsexamples/custom-methods/gsunit

function testManualSearch () {
  var Logician = Goodel("Logicians");

  var alf = Logician.findBy({ firstName: "Alfred", lastName: "Tarski" }),
      brits = Logician.findWhere({ country: "Britain" });
  
  GSUnit.assertObjectIncludes("Finds single record by attribute",
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
  var Logician = Goodel("Logicians"),
      al = new Logician({ firstName: "Alan", lastName: "Turing" });
  
  al.save();

  GSUnit.assertEquals("Adds records by attribute",
                      al['firstName'],
                      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logicians").getRange(6, 1).getValue()
                     );
}

function testNativeFindBy () {
  var Logician = Goodel("Logicians"),
      alf = Logician.table.natFindBy({ firstName: "Alfred", lastName: "Tarski" });
  GSUnit.assertObjectEquals("Finds single record by attribute",
                            alf, { lastName: 'Tarski', firstName: 'Alfred', country: 'Poland' }
                             );
}

function testNativeFindWhere () {
    var Logician = Goodel("Logicians"),
        brits = Logician.table.natFindWhere({ country: "Britain" });

    GSUnit.assertArrayEqualsIgnoringOrder("Finds multiple records by attribute",
                                        brits,
                                        [{ firstName: 'George', lastName: 'Boole', country: 'Britain' },
                                         { firstName: 'Augustus', lastName: 'De Morgan', country: 'Britain' }
                                        ]
                                       );

}

GSUnit.assertObjectIncludes = function (testName, testObj, testAttrs) {
  for (var key in testAttrs) {
    var value = testAttrs[key],
        desc = "<testName>, yielding object with attribute <key>: <value>"
                      .replace("<testName>", testName)
                      .replace("<key>", key)
                      .replace("<value>", value);

    this.assertEquals(desc, testObj[key], value);
  }
}


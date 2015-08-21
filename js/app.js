angular.module('makechange', [])
    .controller('makechangecontroller', function($scope) {

        // error message var
        $scope.errormessage = '';

        // reassign 'this' so we can use it other contexts
        var mcc = this;

        // common-use USD bills and coins (all values in cents to avoid float inaccuracy)
        mcc.denominations = [
            {name: '$100 Bill', type: 'bill', color: 'green', facevalue: "$100", value: 10000},
            {name: '$50 Bill', type: 'bill', color: 'green', facevalue: "$50", value: 5000},
            {name: '$20 Bill', type: 'bill', color: 'green', facevalue: "$20", value: 2000},
            {name: '$10 Bill', type: 'bill', color: 'green', facevalue: "$10", value: 1000},
            {name: '$5 Bill', type: 'bill', color: 'green', facevalue: "$5", value: 500},
            // {name: '$2 Bill', type: 'bill', color: 'green', facevalue: "$2", value: 200},
            {name: '$1 Bill', type: 'bill', color: 'green', facevalue: "$1", value: 100},
            // {name: 'Silver Dollar', type: 'coin', color: 'silver', facevalue: "$1", value: 100},
            // {name: 'Fifty-cent Piece', type: 'coin', color: 'silver', facevalue: "50¢", value: 50},
            {name: 'Quarter', type: 'coin', color: 'silver', facevalue: "25¢", value: 25},
            {name: 'Dime', type: 'coin', color: 'silver', facevalue: "10¢", value: 10},
            {name: 'Nickel', type: 'coin', color: 'silver', facevalue: "5¢", value: 5},
            {name: 'Penny', type: 'coin', color: 'copper', facevalue: "1¢", value: 1}
        ];

        // currency units that will be output
        mcc.units = [];

        // monitor keypresses on the input field, and disallow 'e' for simplicity's sake
        mcc.detectkey = function(e) {
            if ( e.keyCode == 101 ) {
                e.preventDefault();
            };
        };

        // given the input value, make change using the smallest possible number of bills and coins
        mcc.convert = function() {
            var value = mcc.inputvalue;

                // clear any existing results and errors
                mcc.units = [];
                $scope.errormessage = '';

                // convert input value to an integer in cents
                var inputvaluecents = value * 100;

                // try to break off each denomination (starting with the largest)
                angular.forEach(mcc.denominations, function(entry, key) {

                    // determine the whole number of times the current denomination goes into the input value
                    var unitvaluecents = entry.value;
                    var divisiblecount = Math.floor( inputvaluecents / unitvaluecents );

                    // push each unit of currency (if there are any) onto the units object
                    if ( divisiblecount > 0 ) {
                        mcc.units.push({facevalue: entry.facevalue, type: entry.type, color: entry.color, count: divisiblecount});
                    };

                    // reduce input value by the value of the units broken off
                    inputvaluecents = inputvaluecents - ( unitvaluecents * divisiblecount );
                });
        };

        // reset the output
        mcc.reset = function() {
            mcc.units = [];
            mcc.inputvalue = '';
            $scope.errormessage = '';
        };

    });
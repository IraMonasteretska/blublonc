
window.addEventListener('DOMContentLoaded', function () {
    var totalCells = document.querySelectorAll('td.totaltd');
    totalCells.forEach(function (cell) {
        var row = cell.parentElement;

        var inputs = row.querySelectorAll('input[type="number"]');

        function calculateSum() {
            var sum = 0;
            inputs.forEach(function (input) {
                sum += parseInt(input.value) || 0;
            });
            cell.textContent = sum;
        }

        calculateSum();

        inputs.forEach(function (input) {
            input.addEventListener('input', calculateSum);
        });

    });
});


$(document).ready(function() {

    $('.tablewrap').each(function() {
        var $tablewrap = $(this);
        var $totaltd = $tablewrap.find('.totaltd');
        var $warningText = $tablewrap.find('.warningtext');
        var $inputs = $tablewrap.find('input[type="number"]');
        var minTotal = parseInt($tablewrap.data('min')); 
    
        function checkTotal() {
            var sum = 0;
            $inputs.each(function() {
                sum += parseInt($(this).val()) || 0; 
            });
    
            if (sum < minTotal) { 
                $warningText.show();
            } else {
                $warningText.hide();
            }
        }
    
        checkTotal();
        $inputs.on('input', function() {
            checkTotal();
        });
    });

    
    $('.btform').submit(function(event) {
        event.preventDefault(); 
       
        var $tablesWithWarnings = $('.tablewrap').filter(function() {
            var $tablewrap = $(this);
            var sum = 0;
            $tablewrap.find('input[type="number"]').each(function() {
                sum += parseInt($(this).val()) || 0;
            });
            var minTotal = parseInt($tablewrap.data('min'));
            return sum < minTotal;
        });
    
        if ($tablesWithWarnings.length > 0) {
            
            var offset = $tablesWithWarnings.first().offset().top;
            $('html, body').animate({
                scrollTop: offset
            }, 500); 
        } else {
            this.submit();
        }
    });


});


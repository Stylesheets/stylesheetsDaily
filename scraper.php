<?php include 'simple_html_dom.php'; ?>
<style>table td{border:1px solid black; padding:5px;}</style>
<?php // Create DOM from URL or file
 $html = file_get_html('http://www.cigarsinternational.com/joecigar/');

//$html = file_get_html('http://www.cigarsinternational.com/cigars/11242/hc-series-criollo/');
// Find all images


foreach($html->find('div[id=prod-description] h1') as $productName){
		echo '<div>';
		echo $productName;
		echo '</div>';
}
foreach($html->find('div[id=prod-description] h2') as $productQuantity){
		echo '<div>';
		echo $productQuantity;
		echo '</div>';
}
foreach($html->find('div[id=prod-description] p') as $productDescription){
	echo '<div>';

		echo $productDescription;

	echo '</div>';
}
echo '<table>';	
foreach($html->find('form[id=prod-form] table[class=prod-grid] tr') as $omg){
	echo '<tr>';
		foreach($omg->find('td[class=prod-stock] span[class=icon-checkmark] span ') as $element1){
			echo '<td>1';
			echo $element1;
			echo '</td>';
		}
	
		$i = 0;
		foreach($omg->find('td[class=prod-item] span span[class=item]') as $element1){
			 if ($i == 0) {
			 	echo '<td>2';
				echo $element1;
				echo '</td>';
				$i++;
			 }
		}
		
		foreach($omg->find('td[class=prod-type] span') as $element1){
			echo '<td>3';
			echo $element1;
			echo '</td>';
		}
		
		foreach($omg->find('td[class=prod-msrp] span') as $element1){
			echo '<td>4';
			echo $element1;
			echo '</td>';
		}
		
		foreach($omg->find('td[class=prod-price] ') as $element1){
			echo '<td>dd5';
			echo $element1;
			echo '</td>';
		}
	echo '</tr>';
}

echo '</table>';
?>
let langEn = ["English", "Italian", "Chinese", "Japanese", "German", "Russian", "French"];
let languages = ["English", "Italiano", "汉语", "日本語", "Deutsch", "Русский", "Français"];
var cards = "";
for (l in languages) {
	cards += `<div class="card" style="width: 50%;">
	<div class="row g-0">
		<div class="col-md-4">
			<img src="images/${langEn[l]}.png" class="img-fluid rounded-start" alt="${langEn[l]}">
			<h5 class="card-title text-center">${languages[l]} (${langEn[l]})</h5>
		</div>
		<div class="col-md-8">
			<div class="card-body">
				<p class="card-text text" id="${langEn[l]}">${languages[l]}</p>
			</div>
		</div>
	</div>
</div>`
}
document.getElementById("translations").innerHTML = cards;

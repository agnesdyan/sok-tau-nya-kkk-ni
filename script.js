// Data Produk dengan gambar
const produk = [
    {"gambar": "https://cdnpro.eraspace.com/media/catalog/product/i/p/iphone_14_blue_1.jpg", "harga": 15000000, "nama": "iPhone 14"},
    {"nama": "Samsung Galaxy S23", "harga": 14000000, "gambar": "images/galaxy_s23.jpg"},
    {"nama": "Dell XPS 13", "harga": 20000000, "gambar": "images/dell_xps13.jpg"},
    {"nama": "MacBook Air M2", "harga": 18000000, "gambar": "images/macbook_air.jpg"},
    {"nama": "Sony WH-1000XM5", "harga": 5000000, "gambar": "images/sony_headphones.jpg"},
    {"nama": "Logitech MX Master 3", "harga": 1500000, "gambar": "images/logitech_mouse.jpg"},
    {"nama": "Apple Watch Series 8", "harga": 8000000, "gambar": "images/apple_watch.jpg"},
    {"nama": "Lenovo IdeaPad 3", "harga": 7000000, "gambar": "images/lenovo_ideapad.jpg"},
    {"nama": "Xiaomi Redmi Note 12", "harga": 4000000, "gambar": "images/xiaomi_redmi.jpg"},
    {"nama": "Canon EOS R6", "harga": 35000000, "gambar": "images/canon_eos.jpg"},
    {"nama": "Asus ROG Phone 6", "harga": 12000000, "gambar": "images/asus_rog.jpg"},
    {"nama": "Bose SoundLink Revolve", "harga": 3000000, "gambar": "images/bose_speaker.jpg"},
    {"nama": "Google Pixel 7", "harga": 10000000, "gambar": "images/google_pixel.jpg"},
    {"nama": "Fitbit Charge 5", "harga": 2500000, "gambar": "images/fitbit_charge.jpg"},
    {"nama": "DJI Mini 3 Pro", "harga": 15000000, "gambar": "images/dji_mini.jpg"}
];

// Menampilkan Daftar Produk
function displayProducts(products) {
    const productList = document.getElementById('searchResults');
    productList.innerHTML = "";  // Clear previous results
    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product-item');
        div.innerHTML = `
            <img src="${product.gambar}" alt="${product.nama}">
            <div class="info">
                <h3>${product.nama}</h3> <!-- Menambahkan Nama Produk -->
                <p><strong>Harga: </strong>Rp${product.harga.toLocaleString()}</p>
            </div>
        `;
        productList.appendChild(div);
    });
}


// Fungsi Binary Search
function binarySearch(data, target) {
    let low = 0;
    let high = data.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (data[mid].harga === target) {
            return mid;
        } else if (data[mid].harga < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}

// Fungsi untuk mencari berdasarkan nama
function searchByName(data, target) {
    return data.filter(item => item.nama.toLowerCase().includes(target.toLowerCase()));
}

// Sorting Produk berdasarkan harga
function quickSort(data) {
    if (data.length <= 1) return data;
    const pivot = data[Math.floor(data.length / 2)];
    const left = data.filter(item => item.harga < pivot.harga);
    const middle = data.filter(item => item.harga === pivot.harga);
    const right = data.filter(item => item.harga > pivot.harga);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Menangani Form Pencarian
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const searchOption = document.getElementById('searchOption').value;
    const searchInput = document.getElementById('searchInput').value;

    let results = [];

    if (searchOption === '1') {
        const targetHarga = parseInt(searchInput);
        const index = binarySearch(produk, targetHarga);
        if (index !== -1) {
            results.push(produk[index]);
        }
    } else if (searchOption === '2') {
        results = searchByName(produk, searchInput);
    }

    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = "<h3>Hasil Pencarian</h3>";
    if (results.length > 0) {
        displayProducts(results);
    } else {
        searchResults.innerHTML += "<p>Produk tidak ditemukan</p>";
    }
});

// Menampilkan produk awal
displayProducts(quickSort(produk));

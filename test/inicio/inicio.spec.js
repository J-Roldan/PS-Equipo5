const {By, Browser} = require('selenium-webdriver');
const {suite} = require('selenium-webdriver/testing');
const edge = require('selenium-webdriver/edge');

suite(function (env) {
  describe('Open Edge', function () {
    let driver;

    beforeEach(async function () {
      let options = new edge.Options();
      driver = await env.builder()
        .setEdgeOptions(options)
        .build();
    });

    afterEach(async () => await driver.quit());

    // it('Ir a productos', async function () {
    //   await driver.get('http://localhost:3000/Home');
    //   let button = await driver.findElement(By.linkText('Productos'));
    //   await button.click();
    // });

    // it('Ir a Login', async function () {
    //   await driver.get('http://localhost:3000/Home');
    //   let nav = await driver.findElement(By.xpath('//a[contains(text(), "Account")]'));
    //   await nav.click();
    //   let button = await driver.findElement(By.xpath('//a[contains(text(), "Login")]'));
    //   await button.click();
    // });

    // it('Ir a mi Perfil', async function () {
    //   await driver.get('http://localhost:3000/Home');
    //   let nav = await driver.findElement(By.xpath('//a[contains(text(), "Account")]'));
    //   await nav.click();
    //   let button = await driver.findElement(By.xpath('//a[contains(text(), "Mi Cuenta")]'));
    //   await button.click();
    // });

    it('Añadir producto', async function () {
      await driver.get('http://localhost:3000/ProductManagement');
      await driver.manage().setTimeouts({implicit: 500});
      let nameBox = await driver.findElement(By.xpath('//input[@aria-label="Nombre"]'));
      await nameBox.sendKeys('Producto de prueba');
      let descriptionBox = await driver.findElement(By.xpath('//input[@aria-label="Descripción"]'));
      await descriptionBox.sendKeys('Descripción de prueba');
      let priceBox = await driver.findElement(By.xpath('//input[@aria-label="Precio"]'));
      await priceBox.sendKeys('1000');
      let sizeBox = await driver.findElement(By.xpath('//input[@aria-label="Talla"]'));
      await sizeBox.sendKeys('M');
      let typeBox = await driver.findElement(By.xpath('//input[@aria-label="Tipo"]'));
      await typeBox.sendKeys('Camisa');
      let colorBox = await driver.findElement(By.xpath('//input[@aria-label="Color"]'));
      await colorBox.sendKeys('Azul');
      let materialBox = await driver.findElement(By.xpath('//input[@aria-label="Material"]'));
      await materialBox.sendKeys('Algodón');
      let genderBox = await driver.findElement(By.xpath('//input[@aria-label="Genero"]'));
      await genderBox.sendKeys('Hombre');
      let brandBox = await driver.findElement(By.xpath('//input[@aria-label="Marca"]'));
      await brandBox.sendKeys('Test');
      let stockBox = await driver.findElement(By.xpath('//input[@aria-label="Cantidad"]'));
      await stockBox.sendKeys('10');
      let costBox = await driver.findElement(By.xpath('//input[@aria-label="Costo"]'));
      await costBox.sendKeys('500');
      let submitButton = await driver.findElement(By.className('btn btn-success'));
      await driver.sleep(5000);
      console.log('click');
      await submitButton.click();
      console.log('clicked');
      await driver.sleep(5000);
      let alert = await driver.switchTo().alert(); 
      let text = await alert.getText();
      assert.equal('Product added successfully!', text);
      await alert.accept();
      await driver.sleep(5000);
    });
  });
}, { browsers: [Browser.EDGE]});
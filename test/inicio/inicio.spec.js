const {By, Browser} = require('selenium-webdriver');
const assert = require('assert');
const {suite} = require('selenium-webdriver/testing');
const edge = require('selenium-webdriver/edge');
const path = require('path');

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

    it('Ir a productos', async function () {
      await driver.get('http://localhost:3000/Home');
      let button = await driver.findElement(By.linkText('Productos'));
      await button.click();
    });

    it('Ir a Login', async function () {
      await driver.get('http://localhost:3000/Home');
      let nav = await driver.findElement(By.xpath('//a[contains(text(), "Account")]'));
      await nav.click();
      let button = await driver.findElement(By.xpath('//a[contains(text(), "Login")]'));
      await button.click();
    });

    it('Ir a mi Perfil', async function () {
      await driver.get('http://localhost:3000/Home');
      let nav = await driver.findElement(By.xpath('//a[contains(text(), "Account")]'));
      await nav.click();
      let button = await driver.findElement(By.xpath('//a[contains(text(), "Mi Cuenta")]'));
      await button.click();
    });

    it('Añadir producto', async function () {
      await driver.get('http://localhost:3000/Login');
      await driver.sleep(5000);
      let emailBox = await driver.findElements(By.xpath('//input[@aria-label="Email"]'));
      // await driver.executeScript("arguments[0].scrollIntoView(true);", emailBox[1]);
      await emailBox[1].sendKeys('test@b.cl');
      let passwordBox = await driver.findElements(By.xpath('//input[@aria-label="Password"]'));
      //await driver.executeScript("arguments[0].scrollIntoView(true);", passwordBox[1]);
      await passwordBox[1].sendKeys('123');
      let submitButton1 = await driver.findElement(By.className('btn btn-primary'));
      await driver.sleep(2000);
      console.log("click")
      await driver.executeScript("arguments[0].scrollIntoView(true);", submitButton1);
      await driver.sleep(2000);
      await submitButton1.click();
      console.log("clicked");
      await driver.sleep(5000);
      let alert1 = await driver.switchTo().alert();
      let text1 = await alert1.getText();
      assert.equal('Login successful!', text1);
      await alert1.accept();
      await driver.sleep(2000);
      let button = await driver.findElement(By.linkText('Productos'));
      await driver.executeScript("arguments[0].scrollIntoView(true);", button);
      await driver.sleep(2000);
      await button.click();
      await driver.sleep(2000);
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
      const image = path.resolve("./test/inicio/image.jpg");
      await driver.sleep(2000);
      let imageBox = await driver.findElement(By.xpath('//input[@aria-label="Imagen"]'));
      await imageBox.sendKeys(image);
      let submitButton = await driver.findElement(By.className('btn btn-success'));
      await driver.sleep(2000);
      console.log('click');
      await driver.executeScript("arguments[0].scrollIntoView(true);", submitButton);
      await driver.sleep(2000);
      await submitButton.click();
      console.log('clicked');
      await driver.sleep(5000);
      let alert = await driver.switchTo().alert(); 
      let text = await alert.getText();
      assert.equal('Product added successfully!', text);
      await alert.accept();
      await driver.sleep(5000);
    });

    it('Registrar Usuario', async function () {
      await driver.get('http://localhost:3000/Login');
      let nameBox = await driver.findElement(By.xpath('//input[@aria-label="Name"]'));
      await nameBox.sendKeys('Usuario de prueba');
      let emailBox = await driver.findElement(By.xpath('//input[@aria-label="Email"]'));
      await emailBox.sendKeys('prueba@gmail.com');
      let passwordBox = await driver.findElement(By.xpath('//input[@aria-label="Password"]'));
      await passwordBox.sendKeys('1234');
      let ageBox = await driver.findElement(By.xpath('//input[@aria-label="Age"]'));
      await ageBox.sendKeys('20');
      let genderBox = await driver.findElement(By.xpath('//input[@aria-label="Gender"]'));
      await genderBox.sendKeys('Hombre');
      await driver.sleep(2000);
      let submitButton = await driver.findElement(By.className('btn btn-success'));
      await driver.executeScript("arguments[0].scrollIntoView(true);", submitButton);
      await driver.sleep(2000);
      await submitButton.click();
      await driver.sleep(5000);
      let alert = await driver.switchTo().alert();
      let text = await alert.getText();
      assert.equal('Signup successful!', text);
      await alert.accept();
      await driver.sleep(5000);
    });

  });
}, { browsers: [Browser.EDGE]});
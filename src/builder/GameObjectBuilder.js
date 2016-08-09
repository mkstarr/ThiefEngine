var GameObjectBuilder = function (){
  this.tmpObj = null;
};

//----------------------------------------------------------------------

GameObjectBuilder.empty = function () {
  var obj = new GameObject();

  var transform = new Transform();
  obj.addComponent(transform);

  return obj;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.begin = function () {
  this.tmpObj = GameObjectBuilder.empty();
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setStatic = function (bool){
 this.tmpObj.setStatic(bool);
 return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setTransform = function (transform) {
  obj.addComponent(transform);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setPosition = function (vec){
  this.tmpObj.getTransform().setPosition(vec);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setRotation = function (vec){
  this.tmpObj.getTransform().setRotation(vec);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setScale = function (vec){
  this.tmpObj.getTransform().setScale(vec);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setRigidBody = function (){
  var rigidBody = new RigidBody();
  this.tmpObj.addComponent(rigidBody);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setCollider = function (collider){
  this.tmpObj.addComponent(collider);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setRenderer = function (renderer) {
  this.tmpObj.addComponent(renderer);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setMesh = function (mesh) {
  this.tmpObj.getComponent(MeshRenderer).setMesh(mesh);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setMaterial = function (material) {
  this.tmpObj.getComponent(MeshRenderer).setMaterial(material);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setColor = function (color) {
  this.tmpObj.getComponent(MeshRenderer).getMaterial().setColor(color);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setAlphaColor = function (color) {
  this.tmpObj.getComponent(MeshRenderer).setAlphaColor(color);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setTextureRegion = function (texCoord, width, height) {
  this.tmpObj.getComponent(MeshRenderer).setRegion(texCoord, width, height);
  return this;
};

//----------------------------------------------------------------------

/**
 * horizontalDir: -1 -> left, 1 -> right, 0 -> not move
 * verticalDir: -1 -> down, 1 -> up, 0 -> not move
 */
GameObjectBuilder.prototype.addAnimation = function (name, frameCount, horizontal, reverse, startPosition, width, height, speed) {

  var animation = Animation.create(frameCount, horizontal, reverse, startPosition, width, height, speed);

  this.tmpObj.getComponent(MeshRenderer).addAnimation(name,animation);

  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.setAnimation = function (name) {

  this.tmpObj.getComponent(MeshRenderer).setAnimation(name);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.addScript = function (script) {
  this.tmpObj.addComponent(script);
  return this;
};

//----------------------------------------------------------------------

GameObjectBuilder.prototype.end = function () {
  return this.tmpObj;
};

//----------------------------------------------------------------------

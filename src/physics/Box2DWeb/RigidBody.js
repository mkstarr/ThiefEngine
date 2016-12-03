var RigidBody = function (density, friction, restitution){
	Component.call(this);

	this.fixDef = new b2FixtureDef;
	this.fixDef.density = density;
	this.fixDef.friction = friction;
	this.fixDef.restitution = restitution;

	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;

	this.fixture = null;

	this.body = null;

	this.world = null;
};

RigidBody.prototype = new Component();
RigidBody.prototype.constructor = RigidBody;

//----------------------------------------------------------------------

RigidBody.prototype.adapt = function (world) {

	this.world = world;

	this.gameObject.getComponent(Collider).adapt(this.fixDef);

	if(this.isStatic())
		this.bodyDef.type = b2Body.b2_staticBody;
	else
		this.bodyDef.type = b2Body.b2_dynamicBody;

	this.bodyDef.fixedRotation = this.isStatic();

	var t = this.gameObject.getTransform();
  this.bodyDef.position.x = t.position.x;
  this.bodyDef.position.y = t.position.y;

	this.bodyDef.angle = t.rotation.z;

	this.body = this.world.CreateBody(this.bodyDef);
	this.body.SetUserData(this.gameObject);


  this.fixture = this.body.CreateFixture(this.fixDef);

};

//----------------------------------------------------------------------

RigidBody.prototype.getBox2dBody = function () {
	return this.body;
};

//----------------------------------------------------------------------

RigidBody.prototype.getCollider = function () {
	return this.gameObject.getComponent(Collider);
};

//----------------------------------------------------------------------

RigidBody.prototype.isStatic = function () {
	return this.gameObject.isStatic();
};

//----------------------------------------------------------------------

RigidBody.prototype.disable = function () {
	Component.prototype.disable.call(this);
	for(var i=0; i<this.body.GetFixtureList().length;i++){
      this.body.GetFixtureList().get(i).setSensor(true);
  }
	this.body.SetActive(false); //freeze
};

//----------------------------------------------------------------------

RigidBody.prototype.enable = function () {
	Component.prototype.enable.call(this);
	for(var i=0; i<this.body.GetFixtureList().length;i++){
      this.body.GetFixtureList().get(i).setSensor(true);
  }
	this.body.SetActive(true); //unfreeze
};

//----------------------------------------------------------------------

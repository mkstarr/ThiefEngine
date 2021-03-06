var Collider2D = function (width,height) {
	Collider.call(this);

	this.width = width;
  this.height = height;
  this.LT = null;
  this.LB = null;
  this.RB = null;
  this.RT = null;
};

Collider2D.prototype = new Collider();
Collider2D.prototype.constructor = Collider2D;

//----------------------------------------------------------------------

Collider2D.prototype.getBoundingBox = function () {
	var t = this.gameObject.getTransform();

  // if(t.isDirty()){
    var center = this.getCenter();

  	this.LT = new Vector3(center.x-(this.width/2),center.y+(this.height/2), center.z); // LEFT TOP VERTEX
  	this.LB = new Vector3(this.LT.x, this.LT.y - this.height, center.z); // LEFT BOTTOM
  	this.RB = new Vector3(this.LT.x + this.width, this.LT.y - this.height, center.z); // RIGHT BOTTOM
  	this.RT = new Vector3(this.LT.x + this.width, this.LT.y, center.z); // RIGHT TOP
  // }

  return [this.LT, this.LB, this.RB, this.RT];
};

//----------------------------------------------------------------------

Collider2D.prototype.testCircle = function (otherCollider, eps) {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Collider2D.prototype.testRectangle = function (otherCollider, eps) {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Collider2D.prototype.test = function (otherCollider) {

	var result = false;

	if(otherCollider instanceof BoxCollider)
		result = this.testRectangle(otherCollider,0);
	else if(otherCollider instanceof CircleCollider)
		result = this.testCircle(otherCollider,0);
	else
		throw new Error("It's not a Collider type!");

	return result;
};

//----------------------------------------------------------------------


Collider2D.prototype.testEpsilon = function (otherCollider,eps) {

	var result = false;

	if(otherCollider instanceof BoxCollider)
		result = this.testRectangle(otherCollider,eps);
	else if(otherCollider instanceof CircleCollider)
		result = this.testCircle(otherCollider,eps);
	else
		throw new Error("It's not a Collider type!");

	return result;
};

//----------------------------------------------------------------------

Collider2D.prototype.generateContacts = function (vertices, otherCollider, contactManager) {

	// var resultVertexVertex = Collider.STATUS_NONE;
	var resultVertexVertex = this.testVertexVertex(vertices, otherCollider, contactManager);

	var resultVertexEdge = Collider.STATUS_NONE;

	// if penetration/collision has been detected in vertex-vertex phase, we don't need to check vertex-edge.

	// console.log("vertex");
	// console.log(resultVertexVertex);

	// if(resultVertexVertex === Collider.STATUS_NONE){
		resultVertexEdge = this.testVertexEdge(vertices, otherCollider, contactManager);
		// if(this.getId() === 7532 && resultVertexEdge !== Collider.STATUS_NONE)
		// 	console.log("vertex edge " + resultVertexEdge);
	// }
	// else if(this.getId() === 7532)
	// 	console.log("vertex vertex " + resultVertexVertex);

	// console.log("edge");
	// console.log(resultVertexEdge);

	// console.log("###################");

	// if one test has detected something.
	if(resultVertexVertex !== Collider.STATUS_NONE || resultVertexEdge !== Collider.STATUS_NONE){

	  var hasInterpenetration = resultVertexVertex === Collider.STATUS_PENETRATION || resultVertexEdge === Collider.STATUS_PENETRATION;
		var hasCollision = resultVertexVertex === Collider.STATUS_COLLISION || resultVertexEdge === Collider.STATUS_COLLISION;

		if(hasInterpenetration){
			// if(this.getId() === 7532 )
			// 	console.log("PENETRATION " + this.getId() + " " + this.getCenter().y);
			return Collider.STATUS_PENETRATION;
		}else if(hasCollision){
			// if(this.getId() === 7532 )
			// 	console.log("COLLISION " + this.getId() + " " + this.getCenter().y);

			return Collider.STATUS_COLLISION;
		}
	}


	// console.log("none");
  return Collider.STATUS_NONE;
};

//----------------------------------------------------------------------

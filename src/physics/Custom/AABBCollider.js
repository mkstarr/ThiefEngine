var BoxCollider = function (width, height) {
  Polygon.call(this, width, height);
};

BoxCollider.prototype = new Polygon();
BoxCollider.prototype.constructor = BoxCollider;

//----------------------------------------------------------------------

BoxCollider.prototype.getVertices = function () {
  return this.getBoundingBox(); // here I don't return this.vertices, instead I return the boundig box
};

//----------------------------------------------------------------------



//----------------------------------------------------------------------

BoxCollider.prototype.getRadius = function () {
	// diagonal
  return Math.sqrt(( this.width * this.width ) + (  this.height * this.height )) / 2.0;
};

//----------------------------------------------------------------------

BoxCollider.prototype.getNormals = function () {
  var normals = [];
  var center = this.getCenter();

  var p = new Vector2(center.x-1, center.y);
  normals[0] = p.sub(center);

  p = new Vector2(center.x, center.y-1);
  normals[1] = p.sub(center);

  p = new Vector2(center.x+1, center.y);
  normals[2] = p.sub(center);

  p = new Vector2(center.x, center.y+1);
  normals[3] = p.sub(center);

  return normals;
};

//----------------------------------------------------------------------

BoxCollider.prototype.testPoint = function (vec) {

  this.getBoundingBox();

  if(this.LT === null){
    var center = this.getCenter();
  	this.LT = new Vector3(center.x-(this.width/2),center.y+(this.height/2), center.z);
  }

	return GeometryUtil.testRectanglePoint(this.LT, this.width, this.height, vec,0);
};

//----------------------------------------------------------------------

BoxCollider.prototype.testCircle = function (otherCollider,eps) {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

BoxCollider.prototype.testRectangle = function (otherCollider,eps) {

  this.getBoundingBox();

	var vertices = otherCollider.getVertices();

  var result = false;
  for (var i = 0; i < vertices.length && !result; i++) {
    result = result || GeometryUtil.testRectanglePoint(this.LT, this.width, this.height, vertices[i],eps);
  }

  // console.log(result);
  return result;
};

//----------------------------------------------------------------------

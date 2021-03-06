/**
* @class
* @classdesc Represents a 4x4 matrix.
* @param {Vector4} row0 The 1st row.
* @param {Vector4} row1 The 2nd row.
* @param {Vector4} row2 The 3rd row.
* @param {Vector4} row3 The 4th row.
*/
var Matrix4 = function (row0,row1,row2,row3){
    this.data = new Array(16);
    this.transposed = null;
    this.setRows(row0, row1, row2, row3);


    // REMEMBER
    // WebGL uses column-major order (transposed)
    // a webGL matrix : [ [column 0] [column 1] [column 2] [column 3] ]

    // NOTE:
    // You can use the get(row,col) and set(row,col,value) functions
    // to access the data as a row-major ordered matrix.

    // NOTE:
    // Here I use, column-major order.

    /*
        ROW-MAJOR ORDER:

        row 0 | a b c d |
        row 1 | e f g h |
        row 2 | i j k l |
        row 3 | m n o p |

        COLUMN-MAJOR ORDER:

        column 0 | a e i m |
        column 1 | b f j n |
        column 2 | c g k o |
        column 3 | d h l p |

    */
};

//----------------------------------------------------------------------

/**
* Return a copy of the matrix.
* @returns {Matrix4} The copy.
*/
Matrix4.prototype.cpy = function (){
	var copy = Matrix4.zeros();
  copy.data = this.data.slice();

  return copy;
};
//----------------------------------------------------------------------

/**
* Return an array that contains the matrix data.
* @returns {Array} An array that contains the matrix data.
*/
Matrix4.prototype.getData = function (){
	return this.data;
};

//----------------------------------------------------------------------

/**
* Set the internal data array.
* @param {Array} data The data array.
*/
Matrix4.prototype.setData = function (data){
	this.data = data;
};

//----------------------------------------------------------------------

/**
* Return an element of the matrix.
* @param {Number} row The row.
* @param {Number} col The col.
* @returns {Number} An element of the matrix.
*/
Matrix4.prototype.get = function (row,col){
	return this.data[row+(4*col)];
};

//----------------------------------------------------------------------

/**
* Set an element of the matrix.
* @param {Number} row The row.
* @param {Number} col The col.
* @param {Number} value The value of the element.
*/
Matrix4.prototype.set = function (row,col,value){
	this.data[row+(4*col)] = value;
};

//----------------------------------------------------------------------

/**
* Fill the matrix with the given rows.
* @param {Vector4} row0 The 1st row.
* @param {Vector4} row1 The 2nd row.
* @param {Vector4} row2 The 3rd row.
* @param {Vector4} row3 The 4th row.
*/
Matrix4.prototype.setRows = function (row0,row1,row2,row3){
    var rows = new Array(4);
    rows[0] = row0.toArray();
    rows[1] = row1.toArray();
    rows[2] = row2.toArray();
    rows[3] = row3.toArray();

    for (var row = 0; row < 4; row++)
        for (var col = 0; col < 4; col++)
            this.set(row,col,rows[row][col]);
};

//----------------------------------------------------------------------

/**
* Return the transposed matrix.
* @returns {Matrix4} The transposed matrix.
*/
Matrix4.prototype.transpose = function () {

    if(this.transposed === null){

        this.transposed = Matrix4.zeros();

        for (var row = 0; row < 4; row++)
          for (var col = 0; col < 4; col++)
                this.transposed.set(col,row,this.get(row,col));
    }

    return this.transposed;
};

//----------------------------------------------------------------------

/**
* Multiply M1 by M2 and returns the result matrix.
* @param {Matrix4} M1 The 1st matrix.
* @param {Matrix4} M2 The 2nd matrix.
* @returns {Matrix4} The result matrix.
*/
Matrix4.mulMM = function (M1,M2){

    // The result matrix
    var result = this.zeros();

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            for (var k = 0; k < 4; k++){
                result.set(i,j,result.get(i,j) + M1.get(i,k) * M2.get(k,j));
            }

        }
    }

    return result;
};

//----------------------------------------------------------------------

/**
* Multiply M by v and returns the result matrix.
* @param {Matrix4} M The matrix.
* @param {Vector4} v The vector.
* @returns {Vector4} The result vector.
*/
Matrix4.mulMV = function (M,v){

    var vec = v.toArray();

    // The result vector
    var result = new Array(4);

    for (var row = 0; row < 4; row++){
        result[row] = 0;
        for (var col = 0; col < 4; col++)
            result[row] += M.get(row,col) * vec[col];
    }

    var vectorResult = new Vector4(0,0,0,0);
    vectorResult.fromArray(result);

    return vectorResult;

};

//----------------------------------------------------------------------

/**
* Creates a matrix filled with 0s.
* @returns {Matrix4} The result matrix.
*/
Matrix4.zeros = function(){
    return new Matrix4(
        new Vector4(0,0,0,0),
        new Vector4(0,0,0,0),
        new Vector4(0,0,0,0),
        new Vector4(0,0,0,0));
};

//----------------------------------------------------------------------

/**
* Creates an identity matrix.
* @returns {Matrix4} The result matrix.
*/
Matrix4.identity = function(){
    return new Matrix4(
        new Vector4(1,0,0,0),
        new Vector4(0,1,0,0),
        new Vector4(0,0,1,0),
        new Vector4(0,0,0,1));
};

//----------------------------------------------------------------------

/**
* Creates a translation matrix.
* @param {Vector3} vec The translation.
* @returns {Matrix4} The result matrix.
*/
Matrix4.translation = function(vec){
    return new Matrix4(
        new Vector4(1,0,0,vec.x),
        new Vector4(0,1,0,vec.y),
        new Vector4(0,0,1,vec.z),
        new Vector4(0,0,0,1));
};

//----------------------------------------------------------------------

/**
* Creates a rotation matrix. Each component of the vector represents an axis (x,y,z),
* only one component must have a non-zero value. The other two must be zero.
* @param {Vector3} vec The rotation.
* @returns {Matrix4} The result matrix.
*/
Matrix4.rotation = function(vec){
    var result = Matrix4.identity();

    var rad, cos, sin;

    if(vec.x !== 0){
        rad = vec.x*(Math.PI/180);
        sin = Math.sin(rad);
        cos = Math.cos(rad);

        result = new Matrix4(
            new Vector4(1,0,0,0),
            new Vector4(0,cos,-sin,0),
            new Vector4(0,sin,cos,0),
            new Vector4(0,0,0,1));
    }else if(vec.y !== 0){
        rad = vec.y*(Math.PI/180);
        sin = Math.sin(rad);
        cos = Math.cos(rad);

        result = new Matrix4(
            new Vector4(cos,0,sin,0),
            new Vector4(0,1,0,0),
            new Vector4(-sin,0,cos,0),
            new Vector4(0,0,0,1));
    }else if(vec.z !== 0){
        rad = vec.z*(Math.PI/180);
        sin = Math.sin(rad);
        cos = Math.cos(rad);

        result = new Matrix4(
            new Vector4(cos,-sin,0,0),
            new Vector4(sin,cos,0,0),
            new Vector4(0,0,1,0),
            new Vector4(0,0,0,1));
    }

    return result;
};

//----------------------------------------------------------------------

/**
* Creates a scale matrix.
* @param {Vector3} vec The scales.
* @returns {Matrix4} The result matrix.
*/
Matrix4.scale = function(vec){
    return new Matrix4(
        new Vector4(vec.x,0,0,0),
        new Vector4(0,vec.y,0,0),
        new Vector4(0,0,vec.z,0),
        new Vector4(0,0,0,1));
};

//----------------------------------------------------------------------

/**
* Creates an ortographic projection matrix.
* @param {Number} left The left value.
* @param {Number} right The right value.
* @param {Number} bottom The bottom value.
* @param {Number} top The top value.
* @param {Number} near The near value.
* @param {Number} far The far value.
* @returns {Matrix4} The result matrix.
*/
Matrix4.ortho = function(left, right, bottom, top, near, far){
    return new Matrix4(
        new Vector4(2.0/(right-left),0.0,0.0,-((right+left)/(right-left))),
        new Vector4(0.0,2.0/(top-bottom),0.0,-((top+bottom)/(top-bottom))),
        new Vector4(0.0,0.0,(-2.0/(far-near)),-((far+near)/(far-near))),
        new Vector4(0.0,0.0,0.0,1.0));
};

//----------------------------------------------------------------------

/**
* Creates an perspective projection matrix.
* @param {Number} near The near value.
* @param {Number} far The far value.
* @param {Number} aspect The aspect value.
* @param {Number} fov The fov value.
* @returns {Matrix4} The result matrix.
*/
Matrix4.perspective = function(near, far, aspect, fov){

    var top = near * Math.tan((Math.PI/180)*(fov/2));
    var bottom = -top;
    var right = top*aspect;
    var left = -right;

    return new Matrix4(
        new Vector4(((2*near)/(right-left)),0,((right+left)/(right-left)),0),
        new Vector4(0,((2*near)/(top-bottom)),((top+bottom)/(top-bottom)),0),
        new Vector4(0,0,((far+near)/(far-near)),0),
        new Vector4(0,0,-1,0));
};

//----------------------------------------------------------------------

Matrix4.prototype.print = function () {
    string = "";
    for (var row = 0; row < 4; row++){
        for (var col = 0; col < 4; col++)
            string += this.get(row,col) + " ";

        string += "\n";
    }

    console.log(string);
};

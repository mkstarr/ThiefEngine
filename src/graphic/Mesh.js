var Mesh = function (numVertices) {

    this.numVertices = numVertices;
    // var size = numVertices*4;

    this.vertices = [];
    this.normals = [];
    this.faces = [];
    this.texCoord = [];

    this.vIndex = 0; // Vertices index
    this.nIndex = 0; // Normals index
    this.fIndex = 0; // Face index
    this.txIndex = 0; // TexCoord index

    this.max = new Vector3(0,0,0); // store the max width, height, depth;

};

//----------------------------------------------------------------------

Mesh.prototype.addVertex = function (vec) {
    this.vertices[this.vIndex] = vec.x; this.vIndex++;
    this.vertices[this.vIndex] = vec.y; this.vIndex++;
    this.vertices[this.vIndex] = vec.z; this.vIndex++;
    this.vertices[this.vIndex] = vec.w; this.vIndex++;


    // check the max width, height, depth;

    var x = Math.abs(vec.x)*2; // width
    var y = Math.abs(vec.y)*2; // height
    var z = Math.abs(vec.z)*2; // depth

    if(x > this.max.x)
        this.max.x = x;

    if(y > this.max.y)
        this.max.y = y;

    if(z > this.max.z)
        this.max.z = z;

};

//----------------------------------------------------------------------

Mesh.prototype.addNormal = function (vec) {
    this.normals[this.nIndex] = vec.x; this.nIndex++;
    this.normals[this.nIndex] = vec.y; this.nIndex++;
    this.normals[this.nIndex] = vec.z; this.nIndex++;
    this.normals[this.nIndex] = vec.w; this.nIndex++;
};

//----------------------------------------------------------------------

Mesh.prototype.addFace = function (v1,v2,v3) {
    this.faces[this.fIndex] = v1; this.fIndex++;
    this.faces[this.fIndex] = v2; this.fIndex++;
    this.faces[this.fIndex] = v3; this.fIndex++;
};

//----------------------------------------------------------------------

Mesh.prototype.addTexCoord = function (u,v) {
    this.texCoord[this.txIndex] = u; this.txIndex++;
    this.texCoord[this.txIndex] = v; this.txIndex++;
};

//----------------------------------------------------------------------

// TODO: getCenterVertex, getMostTopVertex, getMoreLeftVertex, getMoreRightVertex, getMoreBottomVertex

Mesh.prototype.getVertex = function (index) {
    return new Vector4(this.vertices[(index*4)],this.vertices[(index*4)+1],
        this.vertices[(index*4)+2],this.vertices[(index*4)+3]);
};

//----------------------------------------------------------------------

Mesh.prototype.setVertex = function (index,vec) {
    this.vertices[(index*4)] = vec.x;
    this.vertices[(index*4)+1] = vec.y;
    this.vertices[(index*4)+2] = vec.z;
    this.vertices[(index*4)+3] = vec.w;
};

//----------------------------------------------------------------------

Mesh.prototype.getNumVertices = function () {
    return this.vertices.length/4;
};

//----------------------------------------------------------------------

Mesh.prototype.getNumFaces = function () {
    return this.faces.length/3;
};

//----------------------------------------------------------------------

Mesh.prototype.getVerticesData = function () {
    return this.vertices;
};

//----------------------------------------------------------------------

Mesh.prototype.getNormalsData = function () {
    return this.normals;
};

//----------------------------------------------------------------------

//Mesh.prototype.getColorData();
Mesh.prototype.getFacesData = function () {
    return this.faces;
};

//----------------------------------------------------------------------

Mesh.prototype.getTexCoordData = function () {
    return this.texCoord;
};

//----------------------------------------------------------------------

Mesh.prototype.hasTexture = function () {
    return this.texCoord.length > 0;
};

//----------------------------------------------------------------------

Mesh.prototype.getMax = function () {
    return this.max.cpy();
};

//----------------------------------------------------------------------

Mesh.prototype.print = function () {
    var str = "";
    for (var i = 0; i < (this.numVertices*4); i++) {
        str += this.vertices[i] + "\n";
    }

    console.log(str);
};

//----------------------------------------------------------------------

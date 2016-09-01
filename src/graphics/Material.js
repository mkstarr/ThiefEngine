var Material = function (){
    this.texture = null;
    this.shader = null;
    this.color = Color.NONE;


};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Material.prototype.getTexture = function (){
	 return this.texture;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Material.prototype.setTexture = function (texture){
	 this.texture=texture;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Material.prototype.getShader = function (){
	 return this.shader;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Material.prototype.setShader = function (shader){
	 this.shader=shader;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Material.prototype.setColor = function (color){
	 this.color = color;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Material.prototype.getColor = function (){
	 return this.color;
};

//----------------------------------------------------------------------


/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Material.prototype.enable = function (){
  // TODO: If not texture then use color, ...

  this.shader.enable();

  this.shader.addInt(0, "thereIsTexture");

  if(this.texture !== null){
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textureID);
      // gl.uniform1i(this.thereIsTextureUnifrom , 1);
      // gl.uniform1i(this.samplerUniform , 0);

      this.shader.addInt(1, "hasTexture");
      this.shader.addInt(0, "uSampler");

      this.reset();

  }

};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Material.prototype.disable = function (){

    gl.bindTexture(gl.TEXTURE_2D, null);

    this.shader.disable();
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Material.prototype.reset = function (){
    this.shader.addFloat(0.0, "animationX");
    this.shader.addFloat(0.0, "animationY");
    this.shader.addFloat(1.0, "animationWidth");
    this.shader.addFloat(1.0, "animationHeight");

    this.shader.addFloat(0.0, "regionX");
    this.shader.addFloat(0.0, "regionY");
    this.shader.addFloat(1.0, "regionWidth");
    this.shader.addFloat(1.0, "regionHeight");
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Material.prototype.bind = function (){
    // TODO: If non texture use shader for plain color

    this.shader = Shader.create('default');

    this.shader.compile();

    // console.log(gl.getAttribLocation(this.shader.getProgramid(), "texcoord"));
    //
    // this.thereIsTextureUnifrom = gl.getUniformLocation(this.shader.getProgramid(), "thereIsTexture");

    if(this.texture !== null){

      // this.samplerUniform = gl.getUniformLocation(this.shader.getProgramid(), "uSampler");


      this.textureID = gl.createTexture();

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.textureID);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.texture.getData());
      //  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      //  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

      //   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);

      //   gl.generateMipmap(gl.TEXTURE_2D);


      // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      // Prevents s-coordinate wrapping (repeating).
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      // Prevents t-coordinate wrapping (repeating).
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      //  gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);

    }
};

//----------------------------------------------------------------------

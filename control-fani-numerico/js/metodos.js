(function(){
  function num(v){
    var n=Number(String(v).trim());
    if(!Number.isFinite(n)) throw new Error("Dato numerico invalido");
    return n;
  }
  function parseList(text){
    var arr=String(text).split(",").map(function(v){return num(v)});
    if(arr.length<2) throw new Error("Se necesitan al menos dos datos");
    return arr;
  }
  function fmt(v,d){
    if(!Number.isFinite(v)) return "No definido";
    return Number(v).toFixed(d===undefined?6:d).replace(/\.0+$/," ").trim();
  }
  function cloneMatrix(A){
    return A.map(function(r){return r.slice()});
  }
  function solveGaussian(A,b){
    var n=A.length;
    var M=cloneMatrix(A).map(function(row,i){return row.concat([b[i]])});
    for(var k=0;k<n;k++){
      var max=k;
      for(var i=k+1;i<n;i++) if(Math.abs(M[i][k])>Math.abs(M[max][k])) max=i;
      var temp=M[k];M[k]=M[max];M[max]=temp;
      if(Math.abs(M[k][k])<1e-12) throw new Error("La matriz es singular o casi singular");
      for(var j=k+1;j<=n;j++) M[k][j]/=M[k][k];
      M[k][k]=1;
      for(var r=0;r<n;r++){
        if(r!==k){
          var factor=M[r][k];
          for(var c=k;c<=n;c++) M[r][c]-=factor*M[k][c];
        }
      }
    }
    return M.map(function(row){return row[n]});
  }
  function residual(A,x,b){
    return A.map(function(row,i){
      var s=row.reduce(function(acc,val,j){return acc+val*x[j]},0);
      return s-b[i];
    });
  }
  function normInfVector(v){
    return Math.max.apply(null,v.map(function(x){return Math.abs(x)}));
  }
  function normInfMatrix(A){
    return Math.max.apply(null,A.map(function(row){return row.reduce(function(a,b){return a+Math.abs(b)},0)}));
  }
  function inverse(A){
    var n=A.length;
    var M=cloneMatrix(A).map(function(row,i){
      var eye=[];
      for(var j=0;j<n;j++) eye.push(i===j?1:0);
      return row.concat(eye);
    });
    for(var k=0;k<n;k++){
      var max=k;
      for(var i=k+1;i<n;i++) if(Math.abs(M[i][k])>Math.abs(M[max][k])) max=i;
      var tmp=M[k];M[k]=M[max];M[max]=tmp;
      if(Math.abs(M[k][k])<1e-12) throw new Error("No se puede invertir la matriz");
      var pivot=M[k][k];
      for(var j=0;j<2*n;j++) M[k][j]/=pivot;
      for(var r=0;r<n;r++){
        if(r!==k){
          var f=M[r][k];
          for(var c=0;c<2*n;c++) M[r][c]-=f*M[k][c];
        }
      }
    }
    return M.map(function(row){return row.slice(n)});
  }
  function conditionNumber(A){
    return normInfMatrix(A)*normInfMatrix(inverse(A));
  }
  function jacobi(A,b,tol,maxIter){
    var n=A.length,x=new Array(n).fill(0),rows=[];
    for(var it=1;it<=maxIter;it++){
      var nx=new Array(n).fill(0);
      for(var i=0;i<n;i++){
        var s=0;
        for(var j=0;j<n;j++) if(j!==i) s+=A[i][j]*x[j];
        nx[i]=(b[i]-s)/A[i][i];
      }
      var err=normInfVector(nx.map(function(v,i){return v-x[i]}));
      rows.push({iter:it,x:nx.slice(),error:err});
      x=nx;
      if(err<tol) break;
    }
    return {x:x,rows:rows,residual:residual(A,x,b)};
  }
  function gaussSeidel(A,b,tol,maxIter,omega){
    var n=A.length,x=new Array(n).fill(0),rows=[];
    omega=omega||1;
    for(var it=1;it<=maxIter;it++){
      var old=x.slice();
      for(var i=0;i<n;i++){
        var s=0;
        for(var j=0;j<n;j++) if(j!==i) s+=A[i][j]*x[j];
        var value=(b[i]-s)/A[i][i];
        x[i]=(1-omega)*x[i]+omega*value;
      }
      var err=normInfVector(x.map(function(v,i){return v-old[i]}));
      rows.push({iter:it,x:x.slice(),error:err});
      if(err<tol) break;
    }
    return {x:x,rows:rows,residual:residual(A,x,b)};
  }
  function linearSolve(A,b,method,tol,maxIter,omega){
    if(method==="jacobi") return jacobi(A,b,tol,maxIter);
    if(method==="seidel") return gaussSeidel(A,b,tol,maxIter,1);
    if(method==="sor") return gaussSeidel(A,b,tol,maxIter,omega);
    var x=solveGaussian(A,b);
    return {x:x,rows:[{iter:1,x:x,error:0}],residual:residual(A,x,b)};
  }
  function bisection(fn,a,b,tol,maxIter){
    var fa=fn(a),fb=fn(b),rows=[];
    if(fa*fb>0) throw new Error("El intervalo no tiene cambio de signo");
    var m=a;
    for(var i=1;i<=maxIter;i++){
      m=(a+b)/2;
      var fm=fn(m);
      rows.push({iter:i,a:a,b:b,x:m,fx:fm,error:Math.abs(b-a)/2});
      if(Math.abs(fm)<tol||Math.abs(b-a)/2<tol) break;
      if(fa*fm<0){b=m;fb=fm}else{a=m;fa=fm}
    }
    return {root:m,rows:rows,fx:fn(m)};
  }
  function newton(fn,df,x0,tol,maxIter){
    var rows=[],x=x0;
    for(var i=1;i<=maxIter;i++){
      var d=df(x);
      if(Math.abs(d)<1e-12) throw new Error("Derivada cercana a cero");
      var nx=x-fn(x)/d;
      var err=Math.abs(nx-x);
      rows.push({iter:i,a:x,b:d,x:nx,fx:fn(nx),error:err});
      x=nx;
      if(err<tol||Math.abs(fn(x))<tol) break;
    }
    return {root:x,rows:rows,fx:fn(x)};
  }
  function secant(fn,x0,x1,tol,maxIter){
    var rows=[],a=x0,b=x1;
    for(var i=1;i<=maxIter;i++){
      var fa=fn(a),fb=fn(b);
      if(Math.abs(fb-fa)<1e-12) throw new Error("Division por cero en secante");
      var x=b-fb*(b-a)/(fb-fa);
      var err=Math.abs(x-b);
      rows.push({iter:i,a:a,b:b,x:x,fx:fn(x),error:err});
      a=b;b=x;
      if(err<tol||Math.abs(fn(x))<tol) break;
    }
    return {root:b,rows:rows,fx:fn(b)};
  }
  function rootSolve(base,target,k,method,a,b,tol,maxIter){
    var fn=function(v){return k*v*v+base-target};
    var df=function(v){return 2*k*v};
    if(method==="bisection") return bisection(fn,a,b,tol,maxIter);
    if(method==="newton") return newton(fn,df,a===0?1:a,tol,maxIter);
    return secant(fn,a,b,tol,maxIter);
  }
  function lagrange(xs,ys,x){
    if(xs.length!==ys.length) throw new Error("Las listas deben tener el mismo tamano");
    var total=0;
    for(var i=0;i<xs.length;i++){
      var term=ys[i];
      for(var j=0;j<xs.length;j++) if(i!==j) term*=((x-xs[j])/(xs[i]-xs[j]));
      total+=term;
    }
    return total;
  }
  function curveLagrange(xs,ys,count){
    var min=Math.min.apply(null,xs),max=Math.max.apply(null,xs),data=[];
    for(var i=0;i<count;i++){
      var x=min+(max-min)*i/(count-1);
      data.push({x:x,y:lagrange(xs,ys,x)});
    }
    return data;
  }
  function trapezoid(xs,ys){
    var total=0,rows=[];
    for(var i=0;i<xs.length-1;i++){
      var h=xs[i+1]-xs[i];
      var area=h*(ys[i]+ys[i+1])/2;
      total+=area;
      rows.push({i:i,from:xs[i],to:xs[i+1],area:area,total:total});
    }
    return {value:total,rows:rows};
  }
  function simpson13(xs,ys){
    if((xs.length-1)%2!==0) throw new Error("Simpson 1/3 necesita cantidad par de subintervalos");
    var h=xs[1]-xs[0];
    var sum=ys[0]+ys[ys.length-1];
    for(var i=1;i<ys.length-1;i++) sum+=(i%2===0?2:4)*ys[i];
    return {value:h*sum/3,rows:[{i:0,from:xs[0],to:xs[xs.length-1],area:h*sum/3,total:h*sum/3}]};
  }
  function simpson38(xs,ys){
    if((xs.length-1)%3!==0) throw new Error("Simpson 3/8 necesita subintervalos multiplo de 3");
    var h=xs[1]-xs[0];
    var sum=ys[0]+ys[ys.length-1];
    for(var i=1;i<ys.length-1;i++) sum+=(i%3===0?2:3)*ys[i];
    return {value:3*h*sum/8,rows:[{i:0,from:xs[0],to:xs[xs.length-1],area:3*h*sum/8,total:3*h*sum/8}]};
  }
  function integrate(xs,ys,method){
    if(xs.length!==ys.length) throw new Error("Las listas deben tener el mismo tamano");
    if(method==="trap") return trapezoid(xs,ys);
    if(method==="simpson13") return simpson13(xs,ys);
    return simpson38(xs,ys);
  }
  function odeDescent(method,h0,loss,thrust,critical,step,tmax){
    var f=function(t,h){return thrust-loss};
    var t=0,h=h0,rows=[{t:t,h:h}],criticalTime=null;
    while(t<tmax&&h>0){
      var oldT=t,oldH=h;
      if(method==="euler"){
        h=h+step*f(t,h);
      }else if(method==="heun"){
        var k1=f(t,h);
        var pred=h+step*k1;
        var k2=f(t+step,pred);
        h=h+step*(k1+k2)/2;
      }else{
        var a=f(t,h);
        var b=f(t+step/2,h+step*a/2);
        var c=f(t+step/2,h+step*b/2);
        var d=f(t+step,h+step*c);
        h=h+step*(a+2*b+2*c+d)/6;
      }
      t+=step;
      rows.push({t:t,h:h});
      if(criticalTime===null&&oldH>=critical&&h<=critical){
        var ratio=(oldH-critical)/(oldH-h);
        criticalTime=oldT+ratio*step;
      }
      if(h<=0) break;
    }
    return {rows:rows,criticalTime:criticalTime,finalH:h,finalT:t};
  }
  function socialModel(params){
    var E=params.E,A=params.A,M=params.M,step=params.step,tmax=params.tmax||20,rows=[];
    function f(state){
      var e=state[0],a=state[1],m=state[2];
      return [
        -params.alpha*e*a+params.beta*m*a,
        params.alpha*e*a-params.c*a*m,
        params.k*a-params.r*m
      ];
    }
    function add(s,k,scale){return [s[0]+k[0]*scale,s[1]+k[1]*scale,s[2]+k[2]*scale]}
    for(var t=0;t<=tmax+1e-9;t+=step){
      rows.push({t:t,E:E,A:A,M:M});
      var s=[E,A,M];
      var k1=f(s);
      var k2=f(add(s,k1,step/2));
      var k3=f(add(s,k2,step/2));
      var k4=f(add(s,k3,step));
      E=E+step*(k1[0]+2*k2[0]+2*k3[0]+k4[0])/6;
      A=A+step*(k1[1]+2*k2[1]+2*k3[1]+k4[1])/6;
      M=M+step*(k1[2]+2*k2[2]+2*k3[2]+k4[2])/6;
      E=Math.max(0,E);A=Math.max(0,A);M=Math.max(0,M);
    }
    return {rows:rows,final:{E:E,A:A,M:M}};
  }
  function perturbB(b,percent){
    return b.map(function(v){return v*(1+percent/100)});
  }
  window.MetodosNumericos={
    num:num,parseList:parseList,fmt:fmt,linearSolve:linearSolve,solveGaussian:solveGaussian,residual:residual,conditionNumber:conditionNumber,perturbB:perturbB,rootSolve:rootSolve,lagrange:lagrange,curveLagrange:curveLagrange,integrate:integrate,odeDescent:odeDescent,socialModel:socialModel
  };
})();

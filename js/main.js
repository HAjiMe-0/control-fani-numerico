(function(){
  var MN=window.MetodosNumericos;
  var charts={};
  function $(id){return document.getElementById(id)}
  function all(sel){return Array.prototype.slice.call(document.querySelectorAll(sel))}
  function val(id){return MN.num($(id).value)}
  function htmlMetric(label,value,extra){
    return '<div class="metric '+(extra||'')+'"><span>'+label+'</span><strong>'+value+'</strong></div>';
  }
  function showPage(id){
    all('.page').forEach(function(p){p.classList.toggle('active',p.id===id)});
    all('.nav-link').forEach(function(a){a.classList.toggle('active',a.dataset.page===id)});
    location.hash=id;
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function table(headers,rows){
    return '<table><thead><tr>'+headers.map(function(h){return '<th>'+h+'</th>'}).join('')+'</tr></thead><tbody>'+rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+c+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table>';
  }
  function errorBox(id,msg){
    $(id).innerHTML='<div class="notice">'+msg+'</div>';
  }
  function chart(id,type,labels,datasets){
    if(!window.Chart){return}
    if(charts[id]) charts[id].destroy();
    var ctx=$(id).getContext('2d');
    charts[id]=new Chart(ctx,{type:type,data:{labels:labels,datasets:datasets},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#e2e8f0'}}},scales:{x:{ticks:{color:'#94a3b8'},grid:{color:'rgba(148,163,184,.12)'}},y:{ticks:{color:'#94a3b8'},grid:{color:'rgba(148,163,184,.12)'}}}}});
  }
  function readMatrix(){
    var inputs=all('#matrix-a input').map(function(i){return MN.num(i.value)});
    return [[inputs[0],inputs[1],inputs[2]],[inputs[3],inputs[4],inputs[5]],[inputs[6],inputs[7],inputs[8]]];
  }
  function readB(){return [val('b1'),val('b2'),val('b3')]}
  function runLinear(){
    try{
      var A=readMatrix(),b=readB(),method=$('linear-method').value,tol=val('linear-tol'),omega=val('linear-omega');
      var r=MN.linearSolve(A,b,method,tol,100,omega);
      $('linear-result').innerHTML=htmlMetric('x',MN.fmt(r.x[0],5))+htmlMetric('y',MN.fmt(r.x[1],5))+htmlMetric('z',MN.fmt(r.x[2],5))+htmlMetric('Residuo max',MN.fmt(Math.max.apply(null,r.residual.map(Math.abs)),8),'wide');
      $('linear-table').innerHTML=table(['i','x','y','z','error'],r.rows.map(function(row){return [row.iter,MN.fmt(row.x[0],6),MN.fmt(row.x[1],6),MN.fmt(row.x[2],6),MN.fmt(row.error,8)]}));
      chart('linear-chart','line',r.rows.map(function(row){return row.iter}),[{label:'Error',data:r.rows.map(function(row){return row.error}),borderColor:'#22d3ee',backgroundColor:'rgba(34,211,238,.12)',tension:.35}]);
    }catch(e){errorBox('linear-table',e.message)}
  }
  function runRoot(){
    try{
      var base=val('root-base'),target=val('root-target'),k=val('root-k'),method=$('root-method').value,a=val('root-a'),b=val('root-b'),tol=val('root-tol'),max=val('root-max');
      var r=MN.rootSolve(base,target,k,method,a,b,tol,max);
      var fn=function(v){return k*v*v+base-target};
      var xs=[],ys=[];
      for(var i=0;i<=80;i++){
        var x=a+(b-a)*i/80;
        xs.push(MN.fmt(x,2));ys.push(fn(x));
      }
      $('root-result').innerHTML=htmlMetric('Raiz v',MN.fmt(r.root,6))+htmlMetric('f(v)',MN.fmt(r.fx,8))+htmlMetric('Iteraciones',r.rows.length);
      $('root-table').innerHTML=table(['i','a/x0','b/x1','x','f(x)','error'],r.rows.map(function(row){return [row.iter,MN.fmt(row.a,6),MN.fmt(row.b,6),MN.fmt(row.x,6),MN.fmt(row.fx,8),MN.fmt(row.error,8)]}));
      chart('root-chart','line',xs,[{label:'f(v)',data:ys,borderColor:'#60a5fa',backgroundColor:'rgba(96,165,250,.12)',tension:.25},{label:'Raiz',data:xs.map(function(){return 0}),borderColor:'#34d399',backgroundColor:'rgba(52,211,153,.12)',tension:0}]);
    }catch(e){errorBox('root-table',e.message)}
  }
  function runInterpolation(){
    try{
      var xs=MN.parseList($('interp-x').value),ys=MN.parseList($('interp-y').value),target=val('interp-target');
      var y=MN.lagrange(xs,ys,target);
      var curve=MN.curveLagrange(xs,ys,90);
      $('interp-result').innerHTML=htmlMetric('Tiempo',MN.fmt(target,4)+' s')+htmlMetric('Altitud estimada',MN.fmt(y,4)+' m')+htmlMetric('Metodo','Lagrange');
      $('interp-table').innerHTML=table(['i','tiempo','altitud'],xs.map(function(x,i){return [i+1,MN.fmt(x,4),MN.fmt(ys[i],4)]}));
      chart('interp-chart','line',curve.map(function(p){return MN.fmt(p.x,2)}),[{label:'Curva interpolada',data:curve.map(function(p){return p.y}),borderColor:'#a78bfa',backgroundColor:'rgba(167,139,250,.12)',tension:.35},{label:'Puntos sensor',data:ys,borderColor:'#34d399',backgroundColor:'#34d399',pointRadius:5,showLine:false}]);
    }catch(e){errorBox('interp-table',e.message)}
  }
  function runIntegration(){
    try{
      var xs=MN.parseList($('integ-x').value),ys=MN.parseList($('integ-y').value),method=$('integ-method').value;
      var r=MN.integrate(xs,ys,method);
      var linear=(xs[xs.length-1]-xs[0])*(ys[0]+ys[ys.length-1])/2;
      var dev=Math.abs(r.value-linear)/Math.max(1,Math.abs(linear))*100;
      $('integ-result').innerHTML=htmlMetric('Distancia',MN.fmt(r.value,4)+' m')+htmlMetric('Modelo lineal',MN.fmt(linear,4)+' m')+htmlMetric('Desviacion',MN.fmt(dev,3)+'%');
      $('integ-table').innerHTML=table(['i','desde','hasta','area','acumulado'],r.rows.map(function(row){return [row.i+1,MN.fmt(row.from,4),MN.fmt(row.to,4),MN.fmt(row.area,4),MN.fmt(row.total,4)]}));
      chart('integ-chart','line',xs.map(function(x){return MN.fmt(x,2)}),[{label:'Velocidad',data:ys,borderColor:'#22d3ee',backgroundColor:'rgba(34,211,238,.18)',fill:true,tension:.35}]);
    }catch(e){errorBox('integ-table',e.message)}
  }
  function runOde(){
    try{
      var r=MN.odeDescent($('ode-method').value,val('ode-h0'),val('ode-loss'),val('ode-thrust'),val('ode-critical'),val('ode-step'),80);
      $('ode-result').innerHTML=htmlMetric('Tiempo critico',r.criticalTime===null?'No cruza':MN.fmt(r.criticalTime,4)+' s')+htmlMetric('Altitud final',MN.fmt(r.finalH,3)+' m')+htmlMetric('Tiempo final',MN.fmt(r.finalT,3)+' s');
      $('ode-table').innerHTML=table(['t','H(t)'],r.rows.map(function(row){return [MN.fmt(row.t,4),MN.fmt(row.h,4)]}));
      chart('ode-chart','line',r.rows.map(function(row){return MN.fmt(row.t,2)}),[{label:'Altitud',data:r.rows.map(function(row){return row.h}),borderColor:'#fb7185',backgroundColor:'rgba(251,113,133,.12)',tension:.25}]);
    }catch(e){errorBox('ode-table',e.message)}
  }
  function runCondition(){
    try{
      var A=readMatrix(),b=readB(),delta=val('cond-delta'),bp=MN.perturbB(b,delta),x=MN.solveGaussian(A,b),xp=MN.solveGaussian(A,bp),cond=MN.conditionNumber(A);
      var dif=x.map(function(v,i){return xp[i]-v});
      var stable=cond<100?'Estable':'Sensible';
      $('cond-result').innerHTML=htmlMetric('Condicion',MN.fmt(cond,4))+htmlMetric('Estado',stable)+htmlMetric('Delta b',MN.fmt(delta,2)+'%');
      $('cond-table').innerHTML=table(['variable','original','perturbado','cambio'],['x','y','z'].map(function(name,i){return [name,MN.fmt(x[i],6),MN.fmt(xp[i],6),MN.fmt(dif[i],6)]}));
      chart('cond-chart','bar',['x','y','z'],[{label:'Original',data:x,backgroundColor:'rgba(34,211,238,.55)'},{label:'Perturbado',data:xp,backgroundColor:'rgba(167,139,250,.55)'}]);
    }catch(e){errorBox('cond-table',e.message)}
  }
  function runSocial(){
    try{
      var params={E:val('soc-e'),A:val('soc-a0'),M:val('soc-m'),alpha:val('soc-alpha'),beta:val('soc-beta'),c:val('soc-c'),k:val('soc-k'),r:val('soc-r'),step:val('soc-step'),tmax:20};
      var r=MN.socialModel(params),last=r.rows[r.rows.length-1];
      $('soc-result').innerHTML=htmlMetric('Escepticos',MN.fmt(last.E,4))+htmlMetric('Alarmados',MN.fmt(last.A,4))+htmlMetric('Medios',MN.fmt(last.M,4));
      $('soc-table').innerHTML=table(['t','E','A','M'],r.rows.map(function(row){return [MN.fmt(row.t,2),MN.fmt(row.E,5),MN.fmt(row.A,5),MN.fmt(row.M,5)]}));
      chart('soc-chart','line',r.rows.map(function(row){return MN.fmt(row.t,1)}),[{label:'E',data:r.rows.map(function(row){return row.E}),borderColor:'#22d3ee',backgroundColor:'rgba(34,211,238,.1)',tension:.25},{label:'A',data:r.rows.map(function(row){return row.A}),borderColor:'#fb7185',backgroundColor:'rgba(251,113,133,.1)',tension:.25},{label:'M',data:r.rows.map(function(row){return row.M}),borderColor:'#34d399',backgroundColor:'rgba(52,211,153,.1)',tension:.25}]);
    }catch(e){errorBox('soc-table',e.message)}
  }
  function setValue(id,v){$(id).value=v}
  function caseInterp(){
    setValue('interp-x','1,5,10');setValue('interp-y','800,1200,2500');setValue('interp-target','3');runInterpolation();
    var y=MN.lagrange([1,5,10],[800,1200,2500],3);
    $('case-result').innerHTML='<div class="success">Interpolacion ejecutada. Altitud estimada en t=3: '+MN.fmt(y,4)+' m.</div>';
    showPage('interpolacion');
  }
  function caseOde(){
    setValue('ode-h0','15000');setValue('ode-loss','1500');setValue('ode-thrust','400');setValue('ode-critical','2000');setValue('ode-step','0.5');setValue('ode-method','rk4');runOde();
    var r=MN.odeDescent('rk4',15000,1500,400,2000,.5,80);
    $('case-result').innerHTML='<div class="success">EDO ejecutada. Tiempo critico: '+MN.fmt(r.criticalTime,4)+' s.</div>';
    showPage('edo');
  }
  function caseRoot(){
    setValue('root-base','500');setValue('root-target','580');setValue('root-k','0.02');setValue('root-method','bisection');setValue('root-a','0');setValue('root-b','120');runRoot();
    var r=MN.rootSolve(500,580,.02,'bisection',0,120,.0001,50);
    $('case-result').innerHTML='<div class="success">Raices ejecutado. Punto de quiebre: '+MN.fmt(r.root,5)+'.</div>';
    showPage('raices');
  }
  function boot(){
    all('.nav-link').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();showPage(a.dataset.page)})});
    all('[data-go]').forEach(function(b){b.addEventListener('click',function(){showPage(b.dataset.go)})});
    $('form-sistemas').addEventListener('submit',function(e){e.preventDefault();runLinear()});
    $('form-raices').addEventListener('submit',function(e){e.preventDefault();runRoot()});
    $('form-interpolacion').addEventListener('submit',function(e){e.preventDefault();runInterpolation()});
    $('form-integracion').addEventListener('submit',function(e){e.preventDefault();runIntegration()});
    $('form-edo').addEventListener('submit',function(e){e.preventDefault();runOde()});
    $('form-condicion').addEventListener('submit',function(e){e.preventDefault();runCondition()});
    $('form-social').addEventListener('submit',function(e){e.preventDefault();runSocial()});
    $('case-interp').addEventListener('click',caseInterp);
    $('case-ode').addEventListener('click',caseOde);
    $('case-root').addEventListener('click',caseRoot);
    var start=location.hash.replace('#','')||'inicio';
    if($(start)) showPage(start);
    runLinear();runRoot();runInterpolation();runIntegration();runOde();runCondition();runSocial();
  }
  document.addEventListener('DOMContentLoaded',boot);
})();

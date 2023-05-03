app.LoadPlugin("BarcodeReader");
var res = 0;
var textcode = "...";
var sauv = false;
var activate = true;
var list_chifre = ['1','2','3','4','5','6','7','8','9'];
var butts = [];
var layouts = [];
var frames = [];
var frames2 = [];
var value = "";
var codebar_var = false;
var k = 0;
var mot_de_pass = "YAc3HIa56M54Odfk954H";

function OnStart(){
    var file = "";
    app.SetOrientation("Portrait");
    
    syn= app.CreateMediaPlayer();
    syn.SetFile( "1417.ogg" );
    
    // test de mot de pass 
    /*
    if (app.FolderExists("/sdcard/.Barcode_scann")){
        if (app.FileExists("/sdcard/.Barcode_scann/Barcode_scann.cbs")){
            file = app.ReadFile("/sdcard/.Barcode_scann/Barcode_scann.cbs");
            
            if (file != app.GetMacAddress())
                getkey();
            else
                menu();
        }else{
            getkey();  
        }
    }else{
       getkey(); 
    }
    */
    menu();
    //getkey();
}

function getkey(){
    layoutMDP = app.CreateLayout("linear","vertical,fillXY");
    layoutMDP.SetBackColor("blue");
    
    frameMDP0 = app.CreateLayout("frame","fillX");
    frameMDP0.SetSize(1,0.2);
    
    textMDP = app.CreateText("Enter password, If you don't have the password contact the developer by this number (+213)0675997989) or by email(yakmoh91@gmail.com).",0.9,0.22,"multiline");
    textMDP.SetTextSize(20);
    
    frameMDP1 = app.CreateLayout("frame","fillX");
    frameMDP1.SetSize(1,0.05);
    
    fieldMDP = app.CreateTextEdit("",0.9,0.08);
    fieldMDP.SetBackColor("black");
    fieldMDP.SetTextSize(25);
    
    frameMDP2 = app.CreateLayout("frame","fillX");
    frameMDP2.SetSize(1,0.1);
    
    buttMDP = app.CreateButton("Validez",0.8,0.1,"custom");
    buttMDP.SetStyle("green","#208702",80,"white",2,0);
    buttMDP.SetOnTouch(valide_key);
    
    app.AddLayout(layoutMDP);
    layoutMDP.AddChild(frameMDP0);
    layoutMDP.AddChild(textMDP);
    layoutMDP.AddChild(frameMDP1);
    layoutMDP.AddChild(fieldMDP);
    layoutMDP.AddChild(frameMDP2);
    layoutMDP.AddChild(buttMDP);
}

function menu(){
     
    layout = app.CreateLayout("linear","Vertical,fillXY");
    layout.SetBackColor("#021BC1");
    
    layout0 = app.CreateLayout("Frame","horizontal,fillX");
    layout0.SetSize(1,0.05);
    layout0.SetBackColor("blue");
    
    layout1 = app.CreateLayout("linear","horizontal,fillX");
    layout1.SetSize(1,0.3);
    layout1.SetBackColor("blue");
    
    layout2 = app.CreateLayout("Frame","horizontal,fillX");
    layout2.SetSize(0.6,0.3);
    layout2.SetBackground("images.png");
    
    layout3 = app.CreateLayout("Frame","horizontal,fillX");
    layout3.SetSize(1,0.1);
    
    layout4 = app.CreateLayout("Frame","horizontal,fillX");
    layout4.SetSize(1,0.05);

    text = app.CreateText("barcode scann",1);
    text.SetTextSize(40);
    text.SetBackColor("#021FDC");
    text2 = app.CreateText(" Created by : BENYAHIA Mohammed\n Email : yakmoh91@gmail.com\n Phone : ((+213)0675997989).",1,0.06,"Multiline");
    text2.SetTextSize(9);
    text2.SetTextColor("white");
    text2.SetBackColor("#021DCF");
    
    
    text.SetTextColor("white");
    butt = app.CreateButton("Scan a code",0.6,0.13,"Custom");
    butt.SetStyle("green","#208702",80,"white",2,0);
    butt.SetTextColor("white");
    butt.SetTextSize(20);
    butt.SetOnTouch(scann);
    
    butt2 = app.CreateButton("Exit",0.6,0.13,"Custom");
    butt2.SetStyle("#FF0000","#B60000",80,"white",2,0);
    butt2.SetTextColor("white");
    butt2.SetTextSize(20);
    butt2.SetOnTouch(quit);
    
    layout.AddChild(layout0);
    layout.AddChild(layout1);
    layout1.AddChild(layout2);
    layout.AddChild(text);
    layout.AddChild(text2);
    layout.AddChild(layout3);
    layout.AddChild(butt);
    layout.AddChild(layout4);
    layout.AddChild(butt2);
    app.AddLayout(layout);
}

function scann(){
    app.EnableBackKey(false);
    
    layout4_1 = app.CreateLayout("Linear","vertical,fillXY")
    layout4_1.SetBackColor("blue");
    
    draw = app.CreateImage( null, 1,0.5);
    draw.SetPaintColor("green");
    draw.DrawRectangle(0.05,0.05,0.95,0.95);
    
    draw2 = app.CreateImage( null, 1,0.5);
    draw2.SetPaintStyle("line");
    draw2.SetLineWidth(3);
    draw2.SetPaintColor("white");
    draw2.DrawRectangle(0.05,0.01,0.95,0.15);
    
    draw3 = app.CreateImage( null, 1,0.5);
    draw3.SetPaintStyle("line");
    draw3.SetLineWidth(3);
    draw3.SetAlpha(150);
    draw3.SetPaintColor("red");
    draw3.DrawRectangle(0.1,0.1,0.9,0.9);
    
    layout4_2 = app.CreateLayout( "Absolute", "vertical,fillX" );
    layout4_2.SetBackColor( "#0410AE" );
    layout4_2.SetSize(1,0.5);
    
    layout5 = app.CreateLayout("Linear","horizontal,fillXY")
    layout5.SetSize(1,0.02);
    layout5.SetBackColor( "#0410AE" );
    layout6 = app.CreateLayout("Linear","horizontal,fillXY")
    layout6.SetSize(1,0.04);
    layout6.SetBackColor("#010C97");

    layout7 = app.CreateLayout("Absolute","horizontal,fillXY")
    layout7.SetSize(1,0.11);
    layout7.SetBackColor("blue");
    
    reader = app.CreateObject("BarcodeReader");
    reader.SetBarcodeTypes("CODABAR,CODE 128,CODE 39,CODE93,EAN 13,EAN 8,ITF,RSS,UPC");

    cam = app.CreateCameraView(0.5,0.3,"UXGA,UseYUV");
    cam.SetPosition(0.06,0.03,0.88,0.44);
    cam.SetOnReady(record);
    
    butt2 = app.CreateButton("Enter code",0.9,0.175,"Custom");
    butt2.SetStyle("green","#208702",50,"white",2,0);
    butt2.SetOnTouch(codebar);
    butt2.SetTextSize(25);
    
    butt3 = app.CreateButton("Rescan",0.9,0.175,"Custom");
    butt3.SetStyle("#014287","#00025A",50,"white",2,0);
    butt3.SetOnTouch(Rescann);
    butt3.SetTextSize(25);
    
    text3 = app.CreateText(textcode);
    text3.SetTextColor("white");
    text3.SetPosition(0,0.02,1,0.99);
    text3.SetTextSize(20);
    
    layout4_1.AddChild(layout5);
    layout4_1.AddChild(layout4_2);
    layout4_2.AddChild(draw);
    layout4_2.AddChild(cam);
    layout4_2.AddChild(draw3);
    layout7.AddChild(draw2);
    layout7.AddChild(text3);
    layout4_1.AddChild(layout7);
    layout4_1.AddChild(butt2);
    layout4_1.AddChild(butt3);
    app.AddLayout(layout4_1);
} 

function codebar(){
    codebar_var = true;
    fenetre();
}

function valide_key(){
    if (fieldMDP.GetText() != mot_de_pass){
        app.ShowPopup("Incorrect password.","bottom");  
    }else{
        app.ShowPopup("Correct password.","bottom");
        app.MakeFolder("/sdcard/.Barcode_scann");
        app.WriteFile("/sdcard/.Barcode_scann/Barcode_scann.cbs",app.GetMacAddress(),"ASCII");
        menu();
    }
}

function OnBack(){
    textcode = "...";
    sauv = false;
    menu();
}

function Rescann(){
    textcode = "...";
    text3.SetText(textcode);
    cam.StopPreview();
    record();
}

function record(){

    cam.StartPreview();
    cam.SetZoom(50);
    cam.SetFocusMode("Video");
    readcode();
}

function readcode(){
    res = reader.Decode(cam);
    if ((res!= null)&&(activate == true)){
        syn.Play();
        textcode = res.raw;
        text3.SetText("Code : " + textcode);
        fenetre();
    }
    setTimeout(readcode,150);
}

function quit(){
    app.Exit();
}

function fenetre(){
   if((textcode != "...")||(codebar_var == true)){
        activate = false;
        k = 0;
        dialog = app.CreateDialog("Information" );
        dialog.SetSize(0.7,0.82);
       // dialog.SetTitleColor("blue");
        dialog.SetBackColor( "white" );
   
        layoutF = app.CreateLayout( "Linear", "vertical,fillXY" );
        layoutF.SetBackColor( "blue" );
   
        layoutF0 = app.CreateLayout( "Frame", "horizontal,fillXY" );
        layoutF0.SetBackColor( "blue" );
        layoutF0.SetSize(0.5,0.02);
   
        layoutF1 = app.CreateLayout( "Frame", "horizontal,fillX" );
        layoutF1.SetBackColor( "blue" );
        layoutF1.SetSize(0.5,0.02);
   
        layoutF2 = app.CreateLayout( "Frame", "horizontal,fillX");
        layoutF2.SetBackColor( "blue" );
        layoutF2.SetSize(0.5,0.05);
        
        layoutF2_1 = app.CreateLayout( "linear", "vertical,fillX");
        layoutF2_1.SetBackColor( "blue" );
        layoutF2_1.SetSize(0.7,0.4);
        
        layoutF3 = app.CreateLayout( "Linear", "horizontal,fillX" );
        layoutF3.SetBackColor( "blue" );
        layoutF3.SetSize(0.6,0.08);
   
        layoutF4 = app.CreateLayout( "Frame" );
        layoutF4.SetBackColor( "blue" );
        layoutF4.SetSize(0.05,0.08);
        
        textF = app.CreateText("",0.5,0.07,"Multiline");
        textF.SetTextColor( "white" );
        
        textShow = app.CreateText("");
        textShow.SetTextColor("white");
        textShow.SetBackColor("black")
        
        buttF1 = app.CreateButton("",0.28,0.08,"Custom");
        buttF1.SetOnTouch(Enregistre);
        
        if (codebar_var == true){
            textF.SetText("Enter product code manually");
            buttF1.SetText("Quantity");
            buttF1.SetStyle("#014287","#00025A",50,"white",2,0);
            textShow.SetSize(0.6,0.06);
            textShow.SetTextSize(25);
        }else{
            textF.SetText("Code : "+textcode+"\n Enter product quantity");
            buttF1.SetText("Save");
            buttF1.SetStyle("green","#208702",50,"white",2,0);
            textShow.SetSize(0.6,0.06);
            textShow.SetTextSize(30);
            }
        
        buttF2 = app.CreateButton( "Cancel",0.28,0.08,"Custom");
        buttF2.SetStyle("#FF0000","#B60000",50,"white",2,0);
        buttF2.SetOnTouch(Annulez);
   
        layoutF.AddChild(layoutF0);
        layoutF.AddChild(textF);
        layoutF.AddChild(layoutF1);
        layoutF.AddChild(textShow);
        layoutF.AddChild(layoutF2);
        layoutF.AddChild(layoutF2_1);
        
        for (var i = 0; i < 3;i++){
            layouts[i] = app.CreateLayout("linear","horizontal,fillX");
            layouts[i].SetSize(0.7,0.08);
            for (var j = 0;j < 3;j++){
                butts[k] = app.CreateButton(list_chifre[k],0.2,0.08,"custom");
                //butts[k].SetStyle("#7477F3","#3D3F89",100,"white",1,0);
                butts[k].SetTextColor("white");
                butts[k].SetOnTouch(tapnum);
                if (j != 2){
                    frames[k] = app.CreateLayout("frame");
                    frames[k].SetSize(0.015,0.08);
                }
                layouts[i].AddChild(butts[k]);
                
                if (j != 2)
                    layouts[i].AddChild(frames[k]);
                    k++;
                }
            frames2[i] = app.CreateLayout("frame","fillx")
            frames2[i].SetSize(0.7,0.015);
            layoutF2_1.AddChild(layouts[i]);
            layoutF2_1.AddChild(frames2[i]);
        }
        
        layoutEnd = app.CreateLayout("linear","horizontal,fillX");
        
        frame_s = app.CreateLayout("frame");
        frame_s.SetSize(0.015,0.08);
        
        if (codebar_var == true){
            frame_s2 = app.CreateLayout("frame");
            frame_s2.SetSize(0.015,0.08);
        }
        
        buttN0 = app.CreateButton("0",0.2,0.08,"custom");
       //buttN0.SetStyle("#7477F3","#3D3F89",50,"white",1,0);
        buttN0.SetOnTouch(tapnum);
        
        buttBack = app.CreateButton("<",0.2,0.08,"custom");
        buttBack.SetOnTouch(effacer);
        if (codebar_var == true){
            butt_ = app.CreateButton("-",0.2,0.08,"custom");
            butt_.SetOnTouch(tapnum);
        }else{
            buttBack.SetSize(0.415,0.08);
        }
        
        layoutF2_1.AddChild(layoutEnd);
        
        if (codebar_var == true){
            layoutEnd.AddChild(buttN0);
            layoutEnd.AddChild(frame_s);
            layoutEnd.AddChild(butt_);
            layoutEnd.AddChild(frame_s2);
            layoutEnd.AddChild(buttBack);
        }else{
            layoutEnd.AddChild(buttN0);
            layoutEnd.AddChild(frame_s);
            layoutEnd.AddChild(buttBack);
        }
        layoutF.AddChild(layoutF3);
        layoutF3.AddChild(buttF1);
        layoutF3.AddChild(layoutF4);
        layoutF3.AddChild(buttF2);
        dialog.AddLayout(layoutF);
        dialog.Show();
   }else{
        app.ShowPopup("To add a product in the txt file you must first scan its barcode.","bottom");
   }
}

function effacer(){
    var len = 0;
    var str = "";
    if(value != ""){
        len =  value.length;
        for(var i =0; i<(len-1);i++){
            str += value.charAt(i);
        }
    
        value = str;
        textShow.SetText(value);
    }
}

function tapnum(){
    var len = 0;
    
    if (codebar_var == true)
        len = 15;
    else
        len = 7;
    
    if(value.length < len){
        value += this.GetText();
        textShow.SetText(value);
    }
}

function Annulez(){
    textcode = "...";
    codebar_var = false;
    text3.SetText(textcode);
    value = "";
    activate = true;
    dialog.Hide();
    record();
}


function Enregistre(){
    if (codebar_var == true){
        textcode = value;
        codebar_var = false;
        value = "";
        dialog.Hide();
        fenetre();
    }else{
        if (value  != ""){
            if (app.FolderExists("/sdcard/Code scann")){
                //app.ShowPopup("Cette version est demo donc elle n'accede pas au fichier text"); 
          
                app.WriteFile("/sdcard/Code scann/INV.txt",textcode + ";" + value +"\r\n","Append","UTF-8");
            }else{
                //app.ShowPopup("Cette version est demo donc elle n'accede pas au fichier text"); 
                app.MakeFolder("/sdcard/Code scann");
                app.WriteFile("/sdcard/Code scann/INV.txt",textcode + ";" + value +"\r\n","Append","UTF-8");
            } 
               
            textcode = "...";
            value = "";
            activate = true;
            text3.SetText(textcode);
            dialog.Hide();
            record();
        }else{
            app.ShowPopup("Enter a quantity value.");
        }
    }
}

function tap(num){
    textShow.SetText(num);
    }
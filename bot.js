const Discord = require("discord.js");
const client = new Discord.Client();
const chatbot = require("espchatbotapi")
const config = require("./config.json")
var token = config.token
const Canvas = require("canvas")
const marsnpm = require("marsnpm")
const  Wazzy = require("wazzy");
const  wazzy = new Wazzy.WazzyAPI(token);
const ytdl = require('ytdl-core');

let estados = ["Mi prefix es a!", `Trabajando en ${client.guilds.cache.size} servidores!`, "¿Cuando me pagan?", "SAQUENME DE LATINOAMERICAAAAA", "Hola persona", "Suscribete a darkhole :D", "Soraka is life soraka is lov", "Hola Wape!", "¿Quieres ayudar? Puedes mandar ideas a Aldair!"]
client.on("ready", () => {
   console.log(`Estoy listo!, 
            conectado en ${client.guilds.cache.size} servidores y  ${client.users.cache.size} usuarios.`);
setInterval(function() {
    var estado = estados[Math.floor(Math.random() * estados.length)];
   client.user.setPresence( {
       activity: {
           name: estado,
		   //Si pones estados usas el definido por let, usa estado para usar el presence en RANDOM
           type: "LISTENING"
       },
       status: "online"
    });

}, 1800000)
});
var prefix = config.prefix
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on('message', async (message) => {
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
if (!message.content.startsWith(prefix)) return;
if (message.author.bot) return message.channel.send("Acaso quieres que explote el universo?");

// ::::::::   :::::::   ::::    ::::       :::      ::::    :::  :::::::::    :::::::    ::::::::
//:+:    :+: :+:   :+:  +:+:+: :+:+:+    :+: :+:    :+:+:   :+:  :+:    :+:  :+:   :+:  :+:    :+:
//+:+        +:+   +:+  +:+ +:+:+ +:+   +:+   +:+   :+:+:+  +:+  +:+    +:+  +:+   +:+  +:+
//+#+        +#+   +:+  +#+  +:+  +#+  +#++:++#++:  +#+ +:+ +#+  +#+    +:+  +#+   +#+  +#++:++#++
//+#+        +#+   +#+  +#+       +#+  +#+     +#+  +#+  +#+#+#  +#+    +#+  +#+   #+#         +#+
//#*#   #+#  #+#   #+#  #+#       #+#  #+#     #+#  #+#   #+#+#  #+#    #+#  #+#   #+#  #+#    #+#
// #######    #######   ###       ###  ###     ###  ###    ####  ########     #######    ########

if(command === 'addrol'){
let miembro = message.mentions.members.first();
let rol = args.slice(1).join(' ')
let role = message.guild.roles.cache.find(r => r.name === rol);
let perm = message.member.hasPermission("MANAGE_ROLES");
if(!perm) return message.channel.send("No tienes los permisos necesarios para otorgar el rol.");
if(!miembro) return message.reply("Debe mencionar un usuario.");
if(!rol) return message.channel.send("Escriba el nombre del rol.");
if(!role) return message.channel.send("El rol que se menciono no existe.");
if(message.member.roles.cache.has(role.id)) return message.channel.send(`El usuario **${miembro.user.username}** ya cuenta con el rol **${role.name}**.`);
miembro.roles.add(role).catch(console.error);
message.channel.send(`El rol **${role.name}** fue otorgado a **${miembro.user.username}**.`);
} else
	if(command === 'avatar'){
		let miembro = message.mentions.users.first()
if (!miembro) {
    const embed = new Discord.MessageEmbed()
	.SetTitle(`Avatar de ${message.author.tag}`)
        .setImage(`${message.author.displayAvatarURL()}`)
        .setColor(0x66b3ff);
    message.channel.send(embed);

} else {
    const embed = new Discord.MessageEmbed()
	.SetTitle(`Avatar de ${miembro.tag}`)
        .setImage(`${miembro.displayAvatarURL()}`)
        .setColor(0x66b3ff)
        .setFooter(`Pedido por ${message.author.tag}`);

    message.channel.send(embed);

};

} else
	if(command === 'ping'){
		let ping = Math.floor(message.client.ws.ping);
		const embed = new Discord.MessageEmbed()
.addField(":ping_pong: Pong! Si, estoy vivo!, "+ ping + "ms");
} else
	if(command === 'serverinfo'){
	var server = message.guild;
  
const embed = new Discord.MessageEmbed()
    .setThumbnail(server.iconURL())
    .setAuthor(server.name, server.iconURL())
    .addField('ID', server.id, true)
    .addField('Region', server.region, true)
    .addField('Creado el', server.joinedAt.toDateString(), true)
    .addField('Dueño del Servidor', server.owner.user.tag +'('+server.owner.user.id +')', true)
    .addField('Miembros', server.memberCount, true)
    .addField('Roles', server.roles.size, true)
    .setColor(0x66b3ff)
    
message.channel.send(embed);
} else
	if(command === 'ban'){
	let mencionado = message.mentions.users.first();
let razon = args.slice(1).join(' ');

if(!mencionado) return message.reply('No ha mencionando a ningún miembro.');
if(!razon) return message.channel.send('Escriba una razón del uso de ban.');

message.guild.members.ban(mencionado, {reason: razon});
message.channel.send(`**${mencionado.username}**, fue baneado del servidor, razón: ${razon}.`);
} else
	if(command === 'purge'){
		let cantidad = parseInt(args[0]);
message.channel.bulkDelete(cantidad);
} else
if(command === 'hablar'){
	let txt = args.join(" ")
	chatbot.hablar(txt).then(respuesta => {
    message.channel.send(respuesta)
	})
	} else
		if(command === '8ball'){
 let respuesta = ["Si", "No", "Tal vez", "Obvio", "Yo digo que si", "Yo digo que no", "Probablemente","¿Pan?"]
  var random = respuesta[Math.floor(Math.random() * respuesta.length)]
const embed = new Discord.MessageEmbed()

.addField("A su pregunta", `${args.join(" ")}`)
.addField("Mi respuesta", `${random}`)
.setColor("RANDOM")
message.channel.send(embed)
} else
	if(command === 'rmrol'){
	let miembro = message.mentions.members.first();
let nombrerol = args.slice(1).join(' ');

let role = message.guild.roles.cache.find(r => r.name === nombrerol);
let perms = message.member.hasPermission("MANAGE_ROLES");

if(!perms) return message.channel.send("No tienes permisos suficientes, para remover roles.");
if(!miembro) return message.reply('Debe mencionar a un miembro.');
if(!nombrerol) return message.channel.send('Escriba el nombre del rol a remover.');
if(!role) return message.channel.send('Rol no encontrado en el servidor.');
if(message.member.roles.cache.has(role.id)) return message.channel.send(`El usuario **${miembro.user.username}** no cuenta con el rol **${role.name}**.`);
miembro.roles.remove(role).catch(console.error);
message.channel.send(`El rol **${role.name}** fue removido de **${miembro.user.username}**.`);

} else
	if(command === 'cry'){
	  let url = await marsnpm.cry();

const embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} se puso a llorar`)
    .setColor("RANDOM")
    .setTimestamp()
      .setImage(url); //esta frace es importante ( let url = await marsnpm.cry(); )
       
    message.channel.send(embed);
	} else
	if(command === 'kill'){
		const user = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.displayName === args.join(" ")) || message.guild.members.find(m => m.user.username === args.join(" "))

if(!user) return message.channel.send("Menciona a alguien");
let author = message.author.username;
let url = await marsnpm.kill()
const embed = new Discord.MessageEmbed() //Preferible mandarlo en un Embed ya que la respuesta es un link
.setTitle(`${author} es un asesino y mato a ${message.mentions.users.first().username}`)
.setColor("18CBDA")
.setImage(url);
message.channel.send(embed)
} else
  
if(command === 'boom'){
	let author = message.author.username;
    let user = message.mentions.users.first();
    let url = await marsnpm.boom(); //aqui se pone el tipo de reaccion que sera
  //establecemos el embed
    const embed = new Discord.MessageEmbed()
.setTitle(`**${author}** Activo el modo terrorista`)
    .setColor("RANDOM")
      .setImage(url);
       
    message.channel.send(embed);
	} else
		if(command === 'token'){
			message.channel.send("el token: 'error: token is not defined'");
			} else
				if(command === 'jsedit'){
					message.channel.send("Comando jsedit no encontrado talvez quizo decir 'a!pruebas'");
		} else
			if(command === 'exit'){
				message.channel.send('Enviando logs de la actividad de administrador a gw:aldair.bot.ink');
				setTimeout(function(){ 
				message.channel.send('Apagando el bot..').then(m => {


          m.edit("`En tus sueños`");
 }, 15000);
		  });
					
			} else
		if(command === 'prueba'){
			message.channel.send("command === 'prueba' fallo'");
		    message.channel.send("AutoLogin activado");
			message.channel.send("Accediendo como administrador del bot Bienvenido Aldair");
			message.channel.send("Escribe a!token para mostrar el token");
			message.channel.send("Escribe a!jsedit para agregar un comando");
			message.channel.send("Salir del modo admin a!exit");
			let miembro = message.mentions.users.first() || message.author;
		let user = message.author;
let invert = await wazzy.invert(miembro.displayAvatarURL({format: 'png', size: 2000}));
message.channel.send([invert])
	} else
if(command === 'dance'){
	let author = message.author.username;
    let user = message.mentions.users.first();
    let url = await marsnpm.dance(); //aqui se pone el tipo de reaccion que sera
  //establecemos el embed
    const embed = new Discord.MessageEmbed()
      .setTitle(`${author} se puso a bailar`)
    .setColor("RANDOM")
      .setImage(url);
       
    message.channel.send(embed);
	} else
	
		if(command === 'funar'){
		 let miembro = message.mentions.users.first() || message.author;

    var darksouls = [
      "https://cdn.discordapp.com/attachments/691179999134351380/720503450730758255/wooshfunar.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/720477992689860628/31107078.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/720478099820642354/izv1fiber2t41.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/719017930175676486/9k.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/719017726689148958/30902723.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/719017817290178610/31589661.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/719017521121853440/Z.png",
      "https://cdn.discordapp.com/attachments/691179999134351380/719017404788768828/JsLy6d3w_400x400.png",
      "https://cdn.discordapp.com/attachments/672539492313464832/718977726077337710/5d965e7b7df74.png",
      "https://cdn.discordapp.com/attachments/672539492313464832/718977768754511933/hqdefault.png",
      "https://cdn.discordapp.com/attachments/672539492313464832/718977810617729024/30870506.png"
    ]

    let oruga = darksouls[Math.floor(darksouls.length * Math.random())];

    let funar = new Discord.MessageEmbed()
    funar.setColor("RANDOM")
    funar.setDescription("**"+ message.author.username + "** funó a **" + miembro.username + "**")
    funar.setImage(oruga)
    funar.setTimestamp();
    message.channel.send(funar);
	} else
			if (command === "cookie") {
    let user = message.mentions.users.first() || message.author;
if (message.mentions.bot) return message.channel.send("Los bots no comen xd");
    let aloneEmbed = new Discord.MessageEmbed();

    if (!user)
      return message.reply(
        "Menciona si quieres darle una galleta a alguien mas >w<♥"
      );

    if (user.id === message.author.id)
      return message.channel.send(
        "**" +
          message.author.username +
          "** Toma una galleta.. :cookie: de mi parte ♥ "
      );

    message.channel.send(
      "**" +
        message.author.username +
        " ** le da una galleta \n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :cookie: a  **" +
        user.username +
        "**"
    );
} else
	 if(command === 'leave'){
		 let canalvoz = message.member.voice.channel;

if(!canalvoz) {
    message.channel.send('No estas conectado a un canal de voz.');

} else {
    message.channel.send('Dejando el canal de voz.').then(() => {
        canalvoz.leave();

    }).catch(error => console.log(error));

}
} else
	if(command === 'join'){
		let canalvoz = message.member.voice.channel;

if(!canalvoz || canalvoz.type !== 'voice') {
    message.channel.send('¡Necesitas unirte a un canal de voz primero!.');

} else if (message.guild.voiceConnection) {
    message.channel.send('Ya estoy conectado en un canal de voz.');

} else {
    message.channel.send('Conectando...').then(m => {
        canalvoz.join().then(() => {
            m.edit('Conectado exitosamente.').catch(error => console.log(error));

        }).catch(error => console.log(error));

    }).catch(error => console.log(error));

};
} else
	if(command === 'play'){
		let canalvoz = message.member.voice.channel;

if(!canalvoz) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
if(!args.join(' ')) return message.channel.send('Ingrese un enlace de youtube para poder reproducirlo.');

canalvoz.join()
    .then(connection => {
        const url = ytdl(args.join(' '), { filter : 'audioonly' });
        const dispatcher = connection.play(url);

        message.delete();
        message.channel.send('Reproduciendo ahora: '+ args.join(' '));
        
    }).catch(console.error);
    
} else
if(command === 'say'){
let txt = args.join(" ")
if(!txt) return message.channel.send("Tienes que ingresar un texto para repetir.");
message.channel.send(txt);
} else
	if(command === 'drake') { 
  const mencionado = message.mentions.members.first() //mencionar a un user
if(!mencionado)return message.channel.send('Menciona a alguien')//mensaje q devuelve si no menciona a un user
const Discord = require('discord.js');//definimos el modulo=> discord.js
const Canvas = require('canvas');//definimos el modulo=> canvas

	const canvas = Canvas.createCanvas(520, 524);//el tamaño de la imagen
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://www.huevadas.net/hacer/memes-y-graficos/uploads/memes/8b3ea56e890bbc74c912be4274323e1b/5wxmYT.jpg');//cargamos la imagen de drake
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);//establecemos esa imagen como fondo

	const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));//cargamos el avatar nuestro
		const avatar2 = await Canvas.loadImage(mencionado.user.displayAvatarURL({ format: 'png' }));//cargamos el avatar del mencionado

	ctx.drawImage(avatar2, 261, 1, 258, 258);//aqui muestra la posicion y el tamaaño del avatar del mencionado
ctx.drawImage(avatar, 261, 261, 259, 264);//aqui muestra la posicion y el tamaaño del avatar nuestro
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'draake.png');//creamos el attachment

	message.channel.send(attachment);//mandamos la imagen
} else 
	if(command === 'help'){
	message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');

const embed = new Discord.MessageEmbed()
.setTitle("Comandos de PotatoBot")
    .setAuthor(message.author.username, message.author.avatarURL())
    .addField('ping', 'Compueba la latencia del BOT con la API de discord', true)
    .addField('avatar', 'Muestra el avatar de un usuario', true)
    .addField('serverinfo', 'Muestra información de un servidor', true)
    .addField('ban', 'Banear a un usuario del servidor incluye razon.', true)
    .addField('purge', 'Elimina una cantidad de mensajes', true)
	.addField('addrol', 'Añade un rol del usuario mencionado', true)
	.addField('rmrol', 'Elimina un rol de el usuario mencionado', true)
	.addField('cookie', 'Da una galleta al usuario mencionado', true)
	.addField('funar', 'Funar a un usuario', true)
	.addField('kill', 'Matar al usuario mencionado', true)
	.addField('boom', 'Ser un terrorista', true)
	.addField('dance', 'Bailar, si eso es todo', true)
	.addField('cry', 'Empezar a llorar', true)
	.addField('hablar', 'Habla con la ia de PotatoBot', true)
	.addField('8ball', 'PotatoBot responde tus preguntas', true)
	.addField('play', 'Reproduce musica de un link', true)
	.addField('join', 'El bot entra en tu cabal de voz', true)
	.addField('leave', 'El bot sale del canal de voz', true)
    .setFooter("PotatoBot SorakiVer 0.1", client.user.avatarURL())
    .setColor(0x66b3ff)
    
message.author.send(embed);
}
});
client.login(token);
//Hecho por AldairIsNotReal con amors uwu AldairBot SorakiVer 0.1
//WWWWWWWWWWWWWWWWWWWWWWW@=++++++++++++++++++@=+++++++++*#WWWWWWWWWWWWWWWWWWWWWWWW
//WWWWWWWWWWWWWWWWWWWW@=++++++++++++++++++++=#==++++++++++*@WWWWWWWWWWWWWWWWWWWWWW
//WWWWWWWWWWWWWWWWWW@*+++++++++++++++++++++*@+-@*++++++++++++@WWWWWWWWWWWWWWWWWWWW
//WWWWWWWWWWWWWWWW#+++++++++++++++++++++++*W*..=#+++++++++++++*@WWWWWWWWWWWWWWWWWW
//WWWWWWWWWWWWWW=++++++++++++++++++++++++#@:...+@*++++++++++++++=WWWWWWWWWWWWWWWWW
//WWWWWWWWWWWW#++++++++++++++++++++++++=@+.....+@*++++++++++++++++#WWWWWWWWWWWWWWW
//WWWWWWWWWWW@+++++++++++++++++++++++++#*.....-=@++++++++++++++++++=WWWWWWWWWWWWWW
//WWWWWWWWWW=++++++W++++++++++++++++++++=@@#*+=@++++++++++++++++++++*WWWWWWWWWWWWW
//WWWWWWWW@*++++++W+++++++++++++++++++++++++++++++++++++++++++++++++++*@WWWWWWWWWW
//WWWWWWW@+++++++W++++++++++++++++++*++++++++++++++++++**++++++++++++++*@WWWWWWWWW
//WWWWWW#++++++++W++++++++++++++++++#=#++++++++++++++++*@+++++++++++++++*WWWWWWWWW
//WWWWW#++++++++W++++++++++++++++++#*.+@*++++++++++++++#@#+++++++++++++++#WWWWWWWW
//WWWW#+++++++++W+++++++++++++++++@=...+@*+++++++++++=#-#@*+++++++++++++++=WWWWWWW
//WWW@*+++++++++++++++++++++++++=@+.....=@++++++++++=@:..+W@++++++++++++++++@WWWWW
//WWW=++++++++++++++++++++++++=@-......:@=+++++++++@@-....-*@@=+++++++++++++++#WWW
//WW#+++++++++++++++++++++++#W#-........##+++++++#W=-........-:*#@W#*+++++++++++*@
//WW*++++++++++++++++++++=@W*-...........#@+++*#W#-..............:#+++++++++++++++
//W=++++++++++++++++*#WW=-..............-@=*W@*-.................:@*++++++++++++++
//=++++++++++++*#@W@*:..................:*=*:-...................-#@+++++++++++*@@
//++++++++++++++++#:......................................*@@@*...+W=+++++++++*@#:
//+++++++++++++++#*........--............................=WWWWW@:..=W*+++++++++#@#
//#=++++++++++++*@......-*WWWW=-........................-#WWWWWW+...#@*++++++++=WW
//-:+#++++++++++#=......*WWWWWW=.........*......++.......:WWWWW#-...-#@*+++++++*WW
//--::#=++++++++@*......+WWWWWW=........*#..*#+-*@-........:**:......-=@*++++++*WW
//:+=@#++++++++*W+.......+@WWW=-........-#@@+-+=*-.....................*@++++++*WW
//WWW#+++++++++*W+.....................................................-#=+++++=WW
//WWW#+++++++++*W*.....................................................-#@+++++*WW
//WWW*++++++++++@#-....................................................:#@W*+++WWW
//WW#+++*#++++++#@:.................................................-=@#*=W++*WWWW
//W@+++++=@*++++*W=..........................................-:*#@@#+***#@*+=WWWWW

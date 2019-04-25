using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Scrumban.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string name, string message)

        {
            await Clients.All.SendAsync("ReceiveMessage", name, message);

        }
    }
}

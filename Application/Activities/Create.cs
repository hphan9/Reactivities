using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set;}
        }


        public class Handler : IRequestHandler<Command>
        {
            private DataContext _context;

            public Handler(DataContext dataContext){
                _context = dataContext;
            }
            async Task IRequestHandler<Command>.Handle(Command request, CancellationToken cancellationToken)
            {
                 _context.Activities.Add(request.Activity);
                 await _context.SaveChangesAsync();
            }

        }
    }
}